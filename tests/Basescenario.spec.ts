import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';
async function clickLinkByText(page: any, linkText: string): Promise<void> {
  try {
    const linkSelector = `text=${linkText}`;
    await page.waitForSelector(linkSelector);
    await page.click(linkSelector);
    console.log(`Clicked on the link with text: ${linkText}`);
  } catch (error) {
    console.error(`Error clicking on the link with text "${linkText}": ${error}`);
  }
}
async function registerUser(page: any): Promise<void> {
  const { fakeUserFirstname, fakeUserLastname, fakeEmail, fakePassword } = generateFakeRegistrationData();
  await page.goto('/login');
  await clickLinkByText(page, 'Create a new Account');
  const inputFirstName = '[data-testid="first-name"]';
  const inputLastName = '[data-testid="last-name"]';
  const inputEmail = '[data-testid="email"]';
  const inputPassword = '[data-testid="password"]';
  const inputConfirmPassword = '[data-testid="confirm-password"]';
  const submitButton = '[data-testid="submit"]';

  await page.fill(inputFirstName, fakeUserFirstname);
  await page.fill(inputLastName, fakeUserLastname);
  await page.fill(inputEmail, fakeEmail);
  await page.fill(inputPassword, fakePassword);
  await page.fill(inputConfirmPassword, fakePassword); // Assuming you want to use the same password for confirmation

  await page.click(submitButton);
}

async function registerUserByAPI(page: any, request: any, context: any): Promise<{ access_token: string, userID: string, firstName: string }> {
  const { fakeUserFirstname, fakeUserLastname, fakeEmail, fakePassword } = generateFakeRegistrationData();
  // use API to send data and then take the response 
  const response = await request.post('/api/v1/users/register', {
    data: {
      email: fakeEmail,
      firstName: fakeUserFirstname,
      lastName: fakeUserLastname,
      password: fakePassword
    }
  });

  if (response.status() !== 200) {
    console.error(`Error registering user via API. Status: ${response.status()}`);
    return { access_token: '', userID: '', firstName: '' }; // Return an empty object or handle the error accordingly
  }

  const responseBody = await response.json();
  const access_token = responseBody.access_token;
  const userID = responseBody.userID;
  const firstName = responseBody.firstName;

  console.log(access_token + " space ahmed", userID + " why me ", firstName);

  return { access_token, userID, firstName };
}


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
  await page.pause();
  await page.goto('/todo');  
  await page.pause();
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

await page.pause();
 await page.goto('/todo/new');  
 await page.pause();
 const welcomeText = await page.locator('[data-testid="welcome"]');

    
    // Use the appropriate expectations based on your application's behavior.
  });
test('User should be able to register2 to our application', async ({ page ,request}) => {
  
  await registerUser(page);
    const welcomeText = await page.locator('[data-testid="welcome"]');
  
      await expect(welcomeText).toHaveText('Welcome, User!'); // Replace with the actual welcome text.

    // Use the appropriate expectations based on your application's behavior.
  });
  

export const generateFakeRegistrationData = () => {
  const fakeUserFirstname = faker.person.firstName();
  const fakeUserLastname = faker.person.lastName();
  const fakePassword = '123456789';
  const fakeEmail = faker.internet.email();

  return {
    fakeUserFirstname,
    fakeUserLastname,
    fakePassword,
    fakeEmail,
  };
};
export { registerUser };

