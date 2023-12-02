// Basescenario.spec.ts
import { test, expect } from '@playwright/test';
import { registerUser, generateFakeRegistrationData } from './Basescenario.spec';

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
