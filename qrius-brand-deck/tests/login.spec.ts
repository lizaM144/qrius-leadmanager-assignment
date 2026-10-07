import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import {loginAs} from '../helpers/auth';
import {users} from '../helpers/users';


test.describe('login', () => {
    let loginPage: LoginPage;
    
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('login page has the correct title', async ({ page }) => { 
        await expect(page).toHaveTitle('Qrius Lead Manager'); 
    });

    test('valid login test for admin', async ({ page }) => {
        await loginAs(page, users.ADMIN);
        await expect(page.getByTestId('nav-role')).toHaveText(users.ADMIN.role);
    });

    test('valid login test for agent', async ({ page }) => {
        await loginAs(page, users.AGENT);
        await expect(page.getByTestId('nav-role')).toHaveText(users.AGENT.role);

    });

    test('invalid login test', async ({ page }) => {
        await loginPage.usernameInput.fill('invalid.user');
        await loginPage.passwordInput.fill('invalidpass');        
        await loginPage.loginButton.click();
        await expect(loginPage.loginError).toHaveText('Invalid username or password');
        await expect(page).toHaveURL(/\/login/);
    });

    test('login with empty fields', async ({ page }) => {
        await loginPage.loginButton.click();
        await expect(page).toHaveURL(/\/login/);
        await expect(loginPage.loginError).toHaveText('Username and password are required');
    });
});

