import {test, expect} from '@playwright/test';
import {loginAs} from '../helpers/auth';
import {users} from '../helpers/users';

    test('admin can delete a lead', async ({page}) => {
        await loginAs(page, users.ADMIN);
        const leadRow = page.getByTestId('lead-row').filter({hasText: 'Gita Rai'});
        await expect(leadRow).toBeVisible();
        await leadRow.getByTestId('delete-button').click();

        //verify that the delete lead row is removed from the list
        await expect(leadRow).toHaveCount(0);
        //verify that the lead count is updated after deletion
        await expect(page.getByTestId('lead-count')).toHaveText('Showing 11 of 11 leads');
    });

    test('agent does not see the delete button', async ({page}) => {
        await loginAs(page, users.AGENT);
        await expect(page.getByTestId('delete-button')).toHaveCount(0);
    })
