import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';
import user from '../models/createuser';
import User from '../models/createuser';
import { registerUser, generateFakeRegistrationData ,registerUserByAPI,createToDOByAPI,clickLinkByText} from './Basescenario.spec';
test('User should be able to register to our application by use use module ', async ({ page ,request}) => {
    /*
    * use the module to make it ctreate user and use it more than one 
    */
    
    const user =new User( faker.person.firstName(),faker.person.lastName(),faker.internet.email(),faker.internet.password())
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
        const user =new User( faker.person.firstName(),faker.person.lastName(),faker.internet.email(),faker.internet.password())

        const response = await request.post('/api/v1/users/register', {
            data: {
              email:user.getEmail() ,
              firstName:  user.getFirstNAme(),
              lastName: user.getPassword(),
              password: user.getPassword(),
            }
          });
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
      ])
      await page.goto('/todo');  
  await page.pause();
   
      const welcomeText = await page.locator('[data-testid="welcome"]');

      await expect(welcomeText).toContainText('Good Evening '); // Replace with the actual welcome text.

    });