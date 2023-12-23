import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';
import user from '../models/createuser';
import User from '../models/createuser';
import UserAPi from '../APi/userApi';
import { registerUser, generateFakeRegistrationData ,registerUserByAPI,createToDOByAPI,clickLinkByText} from './Basescenario';
import createApi from '../APi/ToDOApi';
import signuppage from '../pages/signUpPage';
import { toDoPage } from '../pages/toDoPage';
import NewToDoPage from '../pages/NewToDoPage';
import config from '../playwright.config';
test('User should be able to register to our application by use use module ', async ({ page ,request}) => {
    /*
    * use the module to make it ctreate user and use it more than one 
    */
    
    const user =new User( )
    await page.goto('/login');
    await clickLinkByText(page, 'Create a new Account');
    const inputFirstName = '[data-testid="first-name"]';
    const inputLastName = '[data-testid="last-name"]';
    const inputEmail = '[data-testid="email"]';
    const inputPassword = '[data-testid="password"]';
    const inputConfirmPassword = '[data-testid="confirm-password"]';
    const submitButton = '[data-testid="submit"]';
  
    await page.fill(inputFirstName, user.getFirstNAme());
    await page.fill(inputLastName, user.getLastNAme());
    await page.fill(inputEmail, user.getEmail());
    await page.fill(inputPassword, user.getPassword());
    await page.fill(inputConfirmPassword, user.getPassword()); // Assuming you want to use the same password for confirmation
  
    await page.click(submitButton);
  
        const welcomeText = await page.locator('[data-testid="welcome"]');
    
        await expect(welcomeText).toContainText('Good Evening '); // Replace with the actual welcome text.
  
      // Use the appropriate expectations based on your application's behavior.
    });
    
    test('User should be able to register to our application BY API using module api ', async ({ page ,request,context}) => {
        const user =new User( )
// use it to make request through api 
        const response = await new UserAPi().signup(request,user);
                  const responseBody = await response.json();
  const access_token = responseBody.access_token;
  const userID = responseBody.userID;
  const firstName = responseBody.firstName;

        console.log(`Received response: access_token=${access_token}, userID=${userID}, firstName=${firstName}`);
          // use cookies to make the use is log 
      await context.addCookies([
        {
          name: "access_token",
          value: access_token,
          url: config.use?.baseURL,
        },
        {
          name: "firstName",
          value: firstName,
          url: config.use?.baseURL,
        },
        {
          name: "userID",
          value: userID,
          url: config.use?.baseURL,
        },
      ])
      await page.goto('/todo');  
  //await page.pause();
   
      const welcomeText = await page.locator('[data-testid="welcome"]');

      await expect(welcomeText).toContainText('Good Evening '); // Replace with the actual welcome text.

    });
    test("User should be able to create ToDo by using modules", async ({ page,request, context }) => {
      const user =new User( )
      const response = await new UserAPi().signup(request,user);
      const responseBody = await response.json();

      const createTask =await new createApi().createApi(request,"firstCases for siller killer",responseBody.access_token);
      user.setAccessToken(responseBody.access_token);
      user.setUserID(responseBody.userID);
      await context.addCookies([
        {
          name: "access_token",
          value: user.getAccesToken(),
          url: "https://qacart-todo.herokuapp.com",
        },
        {
          name: "firstName",
          value: user.getFirstNAme(),
          url: "https://qacart-todo.herokuapp.com",
        },
        {
          name: "userID",
          value: user.getUserID(),
          url: "https://qacart-todo.herokuapp.com",
        },
      ]);  
      await page.goto('/todo');  
    const toDoListItem = await page.locator('[data-testid="todo-item"]').first();  
    await page.waitForTimeout(20000);
    const textContent = await toDoListItem?.innerText();
    expect(textContent).toEqual('firstCases for siller killer');
  });



  test('User should be able to register to our application by pages  ', async ({ page ,request}) => {
    /*
    * use the module to make it ctreate user and use it more than one 
    */
    
    const user =new User( )
const signUpPage=new signuppage();
await signUpPage.load(page);
await signUpPage.signUp(page,user);
    
 const todolist= new toDoPage();
  
        const welcomeText = await  todolist.welcomeMessagePage(page);
    
        await expect(welcomeText).toContainText('Good Evening '); // Replace with the actual welcome text.
  
      // Use the appropriate expectations based on your application's behavior.
    });


// use model by add the using page module 
    test('User should be able to createTOdo to our application BY Pages ', async ({ page ,request,context}) => {
      const user =new User( )
// use it to make request through api 
const signUpPage=new signuppage();
const todopage= new toDoPage();

 signUpPage.signUpByAPi(request,user,context);
const welcomeText = await todopage.welcomeMessagePage(page);
//await page.pause();
await todopage.load(page)
await expect(welcomeText).toContainText('Good Evening '); // Replace with the actual welcome text.

await expect(welcomeText).toBeVisible();
user.setAccessToken(signUpPage.getAccessToken());
user.setUserID(signUpPage.getUserID());
const createTask =await new createApi().createApi(request,"firstCases for siller killer",signUpPage.getAccessToken());
await page.waitForTimeout(10000);
await todopage.load(page)

const toDoListItem =  todopage.DoItemMessage(page);
const textContent = await toDoListItem?.innerText();
expect(textContent).toEqual('firstCases for siller killer');
  });

  

//delete
  test('User should be able to delete to our application BY Pages ', async ({ page ,request,context}) => {
    const user =new User( )
// use it to make request through api 
const signUpPage=new signuppage();
const todopage= new toDoPage();

signUpPage.signUpByAPi(request,user,context);
const welcomeText = await todopage.welcomeMessagePage(page);
//await page.pause();
await todopage.load(page)
await expect(welcomeText).toContainText('Good Evening '); // Replace with the actual welcome text.

await expect(welcomeText).toBeVisible();

const createTask =await new createApi().createApi(request,"firstCases for siller killer",signUpPage.getAccessToken());
user.setAccessToken(signUpPage.getAccessToken());
user.setUserID(signUpPage.getUserID());
 const toDoListItem = await page.locator('[data-testid="todo-item"]').first();  
    await page.waitForTimeout(1000);
    await todopage.load(page)
    const textContent = await toDoListItem?.innerText();
    expect(textContent).toEqual('firstCases for siller killer');
     todopage.deleteItem(page);
const noMessage = await todopage.noItemMessage(page);
    await expect(noMessage).toContainText('No Available Todos '); // Replace with the actual welcome text.
});
test("User should be able to create ToDo by module ", async ({ page ,request,context}) => {
  const user =new User( )
// use it to make request through api 
const signUpPage=new signuppage();
const todopage= new toDoPage();
const newToDOPage = new NewToDoPage();
signUpPage.signUpByAPi(request,user,context);
const welcomeText = await todopage.welcomeMessagePage(page);
//await page.pause();
await newToDOPage.load(page);
await newToDOPage.todo(page,'ahmed zika');
  const textContent = await newToDOPage.gettoDoListItem(page);
  expect(textContent.first()?.innerText()).toEqual('ahmed zika');
});
test('User should be able to register to our application BY API', async ({ page ,request,context}) => {
  
  const { access_token, userID, firstName } = await registerUserByAPI(page, request, context);
  console.log(`Received response: access_token=${access_token}, userID=${userID}, firstName=${firstName}`);
    // use cookies to make the use is log 
await context.addCookies([
  {
    name: "access_token",
    value: access_token,
    url: "https://qacart-todo.herokuapp.com",
  },
  {
    name: "firstName",
    value: firstName,
    url: "https://qacart-todo.herokuapp.com",
  },
  {
    name: "userID",
    value: userID,
    url: "https://qacart-todo.herokuapp.com",
  },
]);  

const welcomeText = await page.locator('[data-testid="welcome"]');

  
  // Use the appropriate expectations based on your application's behavior.
});
test('User should be able to register to our application a', async ({ page ,request,context}) => {
  
const { access_token, userID, firstName } = await registerUserByAPI(page, request, context);
  //await page.pause();
  await page.goto('/todo');  
  //await page.pause();
  const welcomeText = await page.locator('[data-testid="welcome"]');
   
    
    // Use the appropriate expectations based on your application's behavior.
  });
  

test('User should be able to login to our application', async ({ page ,request,context}) => {
  
  const { fakeUserFirstname, fakeUserLastname, fakeEmail, fakePassword } = generateFakeRegistrationData();
  // use api to send data then take respone 
 const response = await request.post('/api/v1/users/register',{
    data:{
      email:fakeEmail,
      firstName:fakeUserFirstname,
      lastName:fakeUserLastname,
      password:fakePassword

    }
  });
  

const responesBody= await response.json();
const access_token = responesBody.access_token;
const userID = responesBody.userID;
const firstName = responesBody.firstName;
console.log( access_token +"space ahmed",userID+"why me ",firstName);


// use cookies to make the use is log 
await context.addCookies([
  {
    name: "access_token",
    value: access_token,
    url: "https://qacart-todo.herokuapp.com",
  },
  {
    name: "firstName",
    value: firstName,
    url: "https://qacart-todo.herokuapp.com",
  },
  {
    name: "userID",
    value: userID,
    url: "https://qacart-todo.herokuapp.com",
  },
]);  

//await page.pause();
 await page.goto('/todo/new');  
 //await page.pause();
 const welcomeText = await page.locator('[data-testid="welcome"]');

    
    // Use the appropriate expectations based on your application's behavior.
  });
test('User should be able to register2 to our application', async ({ page ,request}) => {
  await registerUser(page);
    const welcomeText = await page.locator('[data-testid="welcome"]');
  
      await expect(welcomeText).toHaveText('Welcome, User!'); // Replace with the actual welcome text.

    // Use the appropriate expectations based on your application's behavior.
  });
  