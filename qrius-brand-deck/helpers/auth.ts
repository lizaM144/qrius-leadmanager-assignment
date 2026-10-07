// helper functions for authentication and login

import { Page } from '@playwright/test';
import { User } from './types';
import { LoginPage } from '../pages/loginPage';

export async function loginAs(page: Page, user: User) {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(user);
}

