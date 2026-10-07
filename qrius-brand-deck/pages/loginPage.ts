import { expect, Page } from '@playwright/test';
import { User } from '../helpers/types';

export class LoginPage {
    readonly page: Page;

    //frequently used locators on the login page
    readonly usernameInput;
    readonly passwordInput;
    readonly loginButton;
    readonly loginError;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
        this.loginError = page.getByTestId('login-error');
    }

    async goto() {
        await this.page.goto('/login');
    }

    async login(user: User) {
        await this.usernameInput.fill(user.username);
        await this.passwordInput.fill(user.password);
        await this.loginButton.click();
        await expect(this.page).toHaveURL(/\/leads/);
    }
}

