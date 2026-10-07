import {test, expect} from '@playwright/test';
import {LeadsPage} from '../pages/leadsPage';
import {loginAs} from '../helpers/auth';
import {users} from '../helpers/users';

    test('admin can delete a lead', async ({page}) => {
        await loginAs(page, users.ADMIN);
        const leadsPage = new LeadsPage(page);
        const leadRow = leadsPage.leadRows.filter({hasText: 'Mina Gurung'});
        await expect(leadRow).toBeVisible();
        await leadsPage.deleteLead('Mina Gurung');

        //verify that the delete lead row is removed from the list
        await expect(leadRow).toHaveCount(0);
        //verify that the lead count is updated after deletion
        await expect(leadsPage.leadCount).toHaveText('Showing 11 of 11 leads');
    });

    test('agent does not see the delete button', async ({page}) => {
        await loginAs(page, users.AGENT);
        const leadsPage = new LeadsPage(page);
        await expect(page.getByTestId('delete-button')).toHaveCount(0);
    })
