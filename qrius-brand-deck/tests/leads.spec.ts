import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import { LeadsPage } from '../pages/leadsPage';
import { loginAs } from '../helpers/auth';
import { users } from '../helpers/users';


test.describe('Admin leads page', () => { 
  let leadsPage: LeadsPage;   
    
  test.beforeEach(async ({page}) => {
    await loginAs(page, users.ADMIN);
    leadsPage = new LeadsPage(page);
  });

  test('shows ADMIN role for an admin', async ({ page }) => {
    await expect(leadsPage.roleBadge).toHaveText(users.ADMIN.role);  });

  test('shows the correct number of leads', async ({ page }) => {
    await expect(leadsPage.leadCount).toHaveText('Showing 12 of 12 leads');
  });
});


  test('shows AGENT role for an agent', async ({ page }) => {
    await loginAs(page, users.AGENT);
    const leadsPage = new LeadsPage(page);
    await expect(leadsPage.roleBadge).toHaveText(users.AGENT.role);
  });
