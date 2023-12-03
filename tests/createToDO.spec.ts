// Basescenario.spec.ts
import { test, expect } from '@playwright/test';
import { registerUser, generateFakeRegistrationData ,registerUserByAPI,createToDOByAPI} from './Basescenario.spec';

// Your imports...

async function Login(page: any): Promise<void> {
  await page.goto('/login');
  const inputEmail = '[data-testid="email"]';
  const inputPassword = '[data-testid="password"]';
  const loginButton = '[data-testid="submit"]';

  // Use the generateFakeRegistrationData function here as well
  const { fakeEmail, fakePassword } = generateFakeRegistrationData();

  await page.fill(inputEmail, fakeEmail);
  await page.fill(inputPassword, fakePassword);
  await page.click(loginButton);
}

test("User should be able to create ToDo", async ({ page }) => {
  await registerUser(page); // No need to pass any data

  const addButton = '[data-testid="add"]';
  const newTodo = '[data-testid="new-todo"]';
  const createItem = '[data-testid="submit-newTask"]';
  const toDoListItem = await page.locator('[data-testid="todo-item"]').first();

  await page.click(addButton);
  await page.fill(newTodo, 'firstCases for siller killer');
  await page.click(createItem);
  await page.waitForTimeout(20000);

  const textContent = await toDoListItem?.innerText();
  expect(textContent).toEqual('firstCases for siller killer');
});

test("User should be able to delete ToDo", async ({ page }) => {
  await Login(page); // No need to pass any data

  const deleteButton = await page.locator('[data-testid="delete"]').first();
  await deleteButton.click();
});
test.describe('user create to do and delete by using api', () => {
  
  test("User should be able to create ToDo", async ({ page,request, context }) => {
    const { access_token, userID, firstName } = await registerUserByAPI(page, request, context);  
    await page.pause();
    await page.goto('/todo/new');  
    await page.pause();
  const newTodo = '[data-testid="new-todo"]';
  const createItem = '[data-testid="submit-newTask"]';
  const toDoListItem = await page.locator('[data-testid="todo-item"]').first();

  await page.fill(newTodo, 'firstCases for siller killer');
  await page.click(createItem);
  await page.waitForTimeout(20000);

  const textContent = await toDoListItem?.innerText();
  expect(textContent).toEqual('firstCases for siller killer');
});
test("User should be able to delete ToDo by apis ", async ({ page ,request, context}) => {
  const { access_token, userID, firstName } = await registerUserByAPI(page, request, context);  
  await createToDOByAPI(page,request,"firstCases for siller killer",access_token);
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
  await createToDOByAPI(page,request,"firstCases for siller killer",access_token);


  await page.pause();
  await page.goto('/todo');  

  await page.pause();

  const toDoListItem = await page.locator('[data-testid="todo-item"]').first();
  const textContent = await toDoListItem?.innerText();
  expect(textContent).toEqual('firstCases for siller killer');
  const deleteButton = await page.locator('[data-testid="delete"]').first();
  await deleteButton.click();
});
});