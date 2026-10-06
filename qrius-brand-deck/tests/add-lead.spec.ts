import {test, expect} from '@playwright/test';
import {loginAs} from '../helpers/auth';
import {users} from '../helpers/users';

test.describe('Admin add lead', () => {
    test.beforeEach(async ({page}) => {
        await loginAs(page, users.ADMIN);
    });

    test('add a new lead with status new', async ({page}) => {
        await page.getByTestId('add-lead-button').click();
        await expect(page.getByRole('heading', {name: 'New lead'})).toBeVisible();

        // Generate a unique name using a timestamp so it never conflicts
        const uniqueId = Date.now();
        const uniqueLeadName = `Test Data ${uniqueId}`;
        const uniqueEmail = `test_${uniqueId}@email.com`;

        await page.getByTestId('name').fill(uniqueLeadName);
        await page.getByTestId('email').fill(uniqueEmail);
        await page.getByTestId('company').fill('Qrius');
        await page.getByTestId('status').selectOption('New');
        await page.getByTestId('save-button').click();

        //verify if lead count increased
        await expect(page.getByTestId('lead-count')).toHaveText('Showing 13 of 13 leads');

        //find the newly added lead in the list and verify its details
        const newLead = page.getByTestId('lead-row').filter({hasText: uniqueLeadName});
        await newLead.scrollIntoViewIfNeeded();
        await expect(newLead).toBeVisible();
        await expect(newLead.getByTestId('lead-status')).toHaveText('New');
    });

    test('add a new lead with status qualified', async ({page}) => {
        await page.getByTestId('add-lead-button').click();
        await expect(page.getByRole('heading', {name: 'New lead'})).toBeVisible();

        // Generate a unique name using a timestamp so it never conflicts
        const uniqueId = Date.now();
        const uniqueLeadName = `Test Data ${uniqueId}`;
        const uniqueEmail = `test_${uniqueId}@email.com`;

        await page.getByTestId('name').fill(uniqueLeadName);
        await page.getByTestId('email').fill(uniqueEmail);
        await page.getByTestId('company').fill('Qrius');
        await page.getByTestId('status').selectOption('Qualified');
        await page.getByTestId('save-button').click();

        //find the newly added lead in the list and verify its details
        const newLead = page.getByTestId('lead-row').filter({hasText: uniqueLeadName});
        await newLead.scrollIntoViewIfNeeded();
        await expect(newLead).toBeVisible();
        await expect(newLead.getByTestId('lead-status')).toHaveText('Qualified');
        //expected: The newly created lead should have status "Qualified" because "Qualified" was selected in the Add Lead form.
        //received: The newly created lead has status "New".
    });

    
});
