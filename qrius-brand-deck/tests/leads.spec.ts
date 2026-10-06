import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/auth';
import { users } from '../helpers/users';


test.describe('Admin leads page', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, users.ADMIN);
  });

  test('shows ADMIN role for an admin', async ({ page }) => {
    await expect(page.getByTestId('nav-role')).toHaveText(users.ADMIN.role);
  });

  test('shows the correct number of leads', async ({ page }) => {
    await expect(page.getByTestId('lead-count')).toHaveText('Showing 12 of 12 leads'); // record failure if the assertion fails, but continue with the test   
  });
});


  test('shows AGENT role for an agent', async ({ page }) => {
    await loginAs(page, users.AGENT);
    await expect(page.getByTestId('nav-role')).toHaveText(users.AGENT.role);
  });
