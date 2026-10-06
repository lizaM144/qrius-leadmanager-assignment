import {test, expect} from '@playwright/test';
import dotenv from "dotenv";

dotenv.config();



test.describe('login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login'); // Navigate to the login page, base URL already set in Playwright config
  });

test('login page has the correct title', async ({ page }) => { 
    await expect(page).toHaveTitle('Qrius Lead Manager'); 
});

test('valid login test for admin', async ({ page }) => {
    await page.getByTestId('username').fill(process.env.ADMIN_USERNAME!);
    await page.getByTestId('password').fill(process.env.ADMIN_PASSWORD!);
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL(/\/leads/);
    await expect(page.getByTestId('nav-role')).toHaveText('ADMIN');
});

test('valid login test for agent', async ({ page }) => {
    await page.getByTestId('username').fill(process.env.AGENT_USERNAME!);
    await page.getByTestId('password').fill(process.env.AGENT_PASSWORD!);
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL(/\/leads/);
    await expect(page.getByTestId('nav-role')).toHaveText('AGENT');

});

test('invalid login test', async ({ page }) => {
    await page.getByTestId('username').fill('invalid.user');
    await page.getByTestId('password').fill(process.env.INVALID_PASSWORD!);
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('login-error')).toHaveText('Invalid username or password');
    await expect(page).toHaveURL(/\/login/);
});
});

