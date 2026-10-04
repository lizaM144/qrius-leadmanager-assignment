import {test, expect} from '@playwright/test';


test('login page has the correct title', async ({ page }) => { 
    await page.goto('http://localhost:5173/login'); // Navigate to the login page, base URL already set in Playwright config
    await expect(page).toHaveTitle('Qrius Lead Manager'); 
});

test('valid login test for admin', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('username').fill('admin.qrius');
    await page.getByTestId('password').fill('Admin@123');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL(/\/leads/);
    await expect(page.getByTestId('nav-role')).toHaveText('ADMIN');
});

test('valid login test for agent', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('username').fill('agent.qrius');
    await page.getByTestId('password').fill('Agent@123');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL(/\/leads/);
    await expect(page.getByTestId('nav-role')).toHaveText('AGENT');

});

