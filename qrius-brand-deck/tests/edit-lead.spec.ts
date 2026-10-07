import {test, expect} from '@playwright/test';
import {LeadsPage} from '../pages/leadsPage';
import {loginAs} from '../helpers/auth';
import {users} from '../helpers/users';

test.describe('Admin edit lead', () => {
    let leadsPage: LeadsPage;

    test.beforeEach(async ({page}) => {
        await loginAs(page, users.ADMIN);
        leadsPage = new LeadsPage(page);
    });

    test('edit a lead name and verfy the change', async({page}) => {
        await leadsPage.openEditLeadForm('Gita Rai');
        await leadsPage.nameInput.fill('Gita Rai Edit');
        await leadsPage.emailInput.fill('gita.updated@example.com');
        await leadsPage.saveLead();

        const updatedLead = leadsPage.leadRows.filter({hasText: 'Gita Rai Edit'});
        await expect(updatedLead).toBeVisible();
        await expect(updatedLead).toContainText('gita.updated@example.com');
    });


    test('edit a lead status and verify the change', async({page}) => {
        await leadsPage.openEditLeadForm('Ram Thapa');
        await leadsPage.statusSelect.selectOption('Qualified');
        await leadsPage.saveLead();

        const updatedLead = leadsPage.leadRows.filter({hasText: 'Ram Thapa'});
        await expect(updatedLead).toBeVisible();
        await expect(updatedLead.getByTestId('lead-status')).toHaveText('Qualified');
    });

    test('cancel editing a lead and verify no changes made', async({page})=> {
        const originalLead = leadsPage.leadRows.filter({hasText: 'Sita Sharma'});
        await leadsPage.openEditLeadForm('Sita Sharma');
        await leadsPage.nameInput.fill('Sita Sharma Edit');
        await leadsPage.cancelLead();

        await expect(leadsPage.leadModal).not.toBeVisible(); // the edit modal should be closed after clicking cancel

        await expect(originalLead).toBeVisible(); // the original lead row should still be visible
        await expect(originalLead).toContainText('Sita Sharma'); // the original lead name should remain unchanged
    })

});