import {test, expect} from '@playwright/test';
import {LeadsPage} from '../pages/leadsPage';
import {loginAs} from '../helpers/auth';
import {users} from '../helpers/users';

test.describe('Admin add lead', () => {
    let leadsPage: LeadsPage;

    test.beforeEach(async ({page}) => {
        await loginAs(page, users.ADMIN);
        leadsPage = new LeadsPage(page);
    });

    test('add a new lead with status new', async ({page}) => {
        // Generate a unique name using a timestamp so it never conflicts
        const uniqueId = Date.now();
        const uniqueLeadName = `Test Data ${uniqueId}`;
        const uniqueEmail = `test_${uniqueId}@email.com`;

        await leadsPage.openAddLeadForm();
        await leadsPage.fillLeadForm(uniqueLeadName, uniqueEmail, 'Qrius', 'New');
        await leadsPage.saveLead();

        //find the newly added lead in the list and verify its details
        const newLead = leadsPage.leadRows.filter({ hasText: uniqueLeadName });
        await expect(newLead).toBeVisible();
        await expect(newLead.getByTestId('lead-status')).toHaveText('New');
    });

    test('add a new lead with status qualified', async ({page}) => {
       // Generate a unique name using a timestamp so it never conflicts
        const uniqueId = Date.now();
        const uniqueLeadName = `Test Data ${uniqueId}`;
        const uniqueEmail = `test_${uniqueId}@email.com`;

        await leadsPage.openAddLeadForm();
        await leadsPage.fillLeadForm(uniqueLeadName, uniqueEmail, 'Qrius', 'Qualified');
        await leadsPage.saveLead();

        //find the newly added lead in the list and verify its details
        const newLead = leadsPage.leadRows.filter({ hasText: uniqueLeadName });
        await expect(newLead).toBeVisible();
        await expect(newLead.getByTestId('lead-status')).toHaveText('Qualified');
        //expected: The newly created lead should have status "Qualified" because "Qualified" was selected in the Add Lead form.
        //received: The newly created lead has status "New".
    });

    test('add new lead but select cancel', async ({page}) => {
        await leadsPage.openAddLeadForm();
        await leadsPage.fillLeadForm('New Lead', 'new@ex.com', 'Qrius', 'New');
        await leadsPage.cancelLead();
        //verify that add lead modal is closed after clicking cancel
        await expect(leadsPage.leadModal).not.toBeVisible();
        const cancelledLead = leadsPage.leadRows.filter({ hasText: 'New Lead' });
        await expect(cancelledLead).toHaveCount(0);
    });
});
