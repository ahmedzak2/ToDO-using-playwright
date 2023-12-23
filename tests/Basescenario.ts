
import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';
import user from '../models/createuser';
import User from '../models/createuser';
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
/*
  if (response.status() !== 200) {
    console.error(`Error registering user via API. Status: ${response.status()}`);
    return { access_token: '', userID: '', firstName: '' }; // Return an empty object or handle the error accordingly
  }
*/
  const responseBody = await response.json();
  const access_token = responseBody.access_token;
  const userID = responseBody.userID;
  const firstName = responseBody.firstName;

  console.log(access_token + " space ahmed", userID + " why me ", firstName);

  return { access_token, userID, firstName };
}

async function createToDOByAPI(page: any, request: any, linkText: string, access_token: string): Promise<void> {
  const responseCreate = await request.post('/api/v1/tasks', {
    data: {
      "isCompleted": false,
      "item": linkText,
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}



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



export { registerUser,registerUserByAPI ,createToDOByAPI,clickLinkByText};

