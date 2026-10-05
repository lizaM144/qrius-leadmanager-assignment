// helper functions for authentication and login

import { expect, Page } from '@playwright/test';
import { User } from './types';

export async function loginAs(page: Page, user: User) {
    await page.goto('/login');
    await page.getByTestId('username').fill(user.username);
    await page.getByTestId('password').fill(user.password);
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL(/\/leads/);
}
