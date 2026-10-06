import {test, expect} from '@playwright/test';
import {loginAs} from '../helpers/auth';
import {users} from '../helpers/users';

test.describe('Admin add lead', () => {
    test.beforeEach(async ({page}) => {
        await loginAs(page, users.ADMIN);
    });

    test('edit a lead name and verfy the change', async({page}) => {
        const leadRow = page.getByTestId('lead-row').filter({hasText: 'Gita Rai'});
        await leadRow.getByTestId('edit-button').click();
        await expect(page.getByTestId('lead-modal')).toBeVisible();
        await page.getByTestId('name').fill('Gita Rai Edit');
        await page.getByTestId('email').fill('gita.updated@example.com');
        await page.getByTestId('save-button').click();

        const updatedLead = page.getByTestId('lead-row').filter({hasText: 'Gita Rai Edit'});
        await expect(updatedLead).toContainText('gita.updated@example.com');
        await expect(updatedLead).toBeVisible();
    });


    test('edit a lead status and verify the change', async({page}) => {
        const leadRow = page.getByTestId('lead-row').filter({hasText: 'Ram Thapa'});
        await leadRow.getByTestId('edit-button').click();
        await expect(page.getByTestId('lead-modal')).toBeVisible();
        await page.getByTestId('status').selectOption('Qualified');
        await page.getByTestId('save-button').click();

        const updatedLead = page.getByTestId('lead-row').filter({hasText: 'Ram Thapa'});
        await expect(updatedLead.getByTestId('lead-status')).toHaveText('Qualified');
    });

    test('cancel editing a lead and verify no changes made', async({page})=> {
        const leadRow = page.getByTestId('lead-row').filter({hasText: 'Sita Sharma'});
        await leadRow.getByTestId('edit-button').click();
        await expect(page.getByTestId('lead-modal')).toBeVisible();
        await page.getByTestId('name').fill('Sita Sharma Edit');
        await page.getByTestId('cancel-button').click();
        await expect(page.getByTestId('lead-modal')).not.toBeVisible(); // the edit modal should be closed after clicking cancel

        await expect(leadRow).toBeVisible(); // the original lead row should still be visible
        await expect(leadRow).toContainText('Sita Sharma'); // the original lead name should remain unchanged
    })

});