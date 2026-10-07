import { test, expect } from '@playwright/test';
import { LeadsPage } from '../pages/leadsPage';
import { loginAs } from '../helpers/auth';
import { users } from '../helpers/users';


test.describe('Search leads', () => {  
  let leadsPage: LeadsPage;   
    
  test.beforeEach(async ({page}) => {
    await loginAs(page, users.ADMIN);
    leadsPage = new LeadsPage(page);
  });

  test('search leads by name', async ({ page }) => {
    await leadsPage.searchLead('Gita Rai'); // this name is on the list of leads
    await expect(leadsPage.leadRows).toHaveCount(1); // verifies that only one lead is displayed after the search
    await expect(leadsPage.leadRows).toContainText('Gita Rai'); // verifies that the displayed lead matches the search query
});

test('searches leads by company name', async ({ page }) => {
  await leadsPage.searchLead('Sajha Yatayat'); // this company name is on the list of leads
  const rows = page.getByTestId('lead-row');
  //expected: 1 matching lead
  //known failure: the app currently displays all 12 leads instead of filtering by company name
  await expect(leadsPage.leadRows).toHaveCount(1); 
  await expect(leadsPage.leadRows).toContainText('Sajha Yatayat');
});

test('shows empty state when no lead matches the search', async ({ page }) => {
  await leadsPage.searchLead('invalid search');
  await expect(leadsPage.emptyState).toBeVisible();
  // verifies that no leads are displayed and the empty state message is shown when searched for a non-existent lead
  await expect(leadsPage.emptyState).toHaveText('No leads found.');
});

test('updates lead count after searching', async ({ page }) => {
  await leadsPage.searchLead('Gita Rai');
  await expect(leadsPage.leadRows).toHaveCount(1);
  //expected: the count should change from 12 to 1 after the search
  //known failure: the app currently still shows "Showing 12 of 12 leads" instead of updating to "Showing 1 of 1 lead"
  await expect(leadsPage.leadCount).toHaveText('Showing 1 of 1 lead'); 
});

test('clearing the search shows all leads again', async ({ page }) => {
  await leadsPage.searchLead('Ram Thapa'); 
  await expect(leadsPage.leadRows).toHaveCount(1); 
  await leadsPage.searchLead('');
  await expect(leadsPage.leadRows).toHaveCount(12);
  // verifies that after clearing the search input, all the original leads are displayed
  await expect(leadsPage.leadCount).toHaveText('Showing 12 of 12 leads');
});
 
});

