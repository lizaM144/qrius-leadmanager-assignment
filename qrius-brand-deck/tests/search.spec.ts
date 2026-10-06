import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/auth';
import { users } from '../helpers/users';


test.describe('Admin leads page', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, users.ADMIN);
  });

  test('search leads by name', async ({ page }) => {
    const search = page.getByTestId('search-input');
    await search.fill('Gita Rai'); // this name is on the list of leads
    const rows = page.getByTestId('lead-row');
    await expect(rows).toHaveCount(1); // verifies that only one lead is displayed after the search
    await expect(page.getByTestId('lead-row')).toContainText('Gita Rai'); // verifies that the displayed lead matches the search query
});

test('searches leads by company name', async ({ page }) => {
  const search = page.getByTestId('search-input');
  await search.fill('Sajha Yatayat'); // this company name is on the list of leads
  const rows = page.getByTestId('lead-row');
  //expected: 1 matching lead
  //known failure: the app currently displays all 12 leads instead of filtering by company name
  await expect(rows).toHaveCount(1);
  await expect(page.getByTestId('lead-row')).toContainText('Sajha Yatayat'); 
});

test('shows empty state when no lead matches the search', async ({ page }) => {
  await page.getByTestId('search-input').fill('invalid search');
  await expect(page.getByTestId('empty-state')).toBeVisible();
  // verifies that no leads are displayed and the empty state message is shown when searched for a non-existent lead
  await expect(page.getByTestId('empty-state')).toHaveText('No leads found.');
});

test('updates lead count after searching', async ({ page }) => {
  await page.getByTestId('search-input').fill('Gita Rai'); 
  await expect(page.getByTestId('lead-row')).toHaveCount(1);
  //expected: the count should change from 12 to 1 after the search
  //known failure: the app currently still shows "Showing 12 of 12 leads" instead of updating to "Showing 1 of 1 lead"
  await expect(page.getByTestId('lead-count')).toHaveText('Showing 1 of 1 lead'); 
});

test('clearing the search shows all leads again', async ({ page }) => {
  const search = page.getByTestId('search-input');
  await search.fill('Ram Thapa');
  await expect(page.getByTestId('lead-row')).toHaveCount(1);
  await search.fill('');
  await expect(page.getByTestId('lead-row')).toHaveCount(12);
  // verifies that after clearing the search input, all the original leads are displayed
  await expect(page.getByTestId('lead-count')).toHaveText('Showing 12 of 12 leads');
});
 
});

