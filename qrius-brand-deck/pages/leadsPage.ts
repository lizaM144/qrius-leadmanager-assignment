import {expect, Page} from '@playwright/test';

export class LeadsPage {
    readonly page: Page;
    //frequently used locators on the leads page
    readonly roleBadge;
    readonly leadRows;
    readonly leadCount;
    readonly searchInput;

    //add/edit lead form locators
    readonly addLeadButton;
    readonly leadModal;
    readonly nameInput; 
    readonly emailInput; 
    readonly companyInput; 
    readonly statusSelect; 
    readonly saveButton; 
    readonly cancelButton;

    //other locators
    readonly emptyState; 
    readonly heading;

    constructor(page: Page) {
        this.page = page;

        //leads page
        this.roleBadge = page.getByTestId('nav-role');
        this.leadRows = page.getByTestId('lead-row');
        this.leadCount = page.getByTestId('lead-count');
        this.searchInput = page.getByTestId('search-input');

        //add/edit lead form
        this.addLeadButton = page.getByTestId('add-lead-button');
        this.leadModal = page.getByTestId('lead-modal');
        this.nameInput = page.getByTestId('name');
        this.emailInput = page.getByTestId('email');
        this.companyInput = page.getByTestId('company');
        this.statusSelect = page.getByTestId('status');
        this.saveButton = page.getByTestId('save-button');
        this.cancelButton = page.getByTestId('cancel-button');

        //other locators
        this.emptyState = page.getByTestId('empty-state');
        this.heading = page.getByRole('heading', { name: 'New lead' });
    }

    async searchLead(searchText: string) {
        await this.searchInput.fill(searchText);
    }
    //add lead form
    async openAddLeadForm(){
        await this.addLeadButton.click();
        await expect(this.leadModal).toBeVisible();
    }

    async fillLeadForm(name: string, email: string, company: string, status: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.companyInput.fill(company);
        await this.statusSelect.selectOption(status);
    }
    async saveLead() {
        await this.saveButton.click();
    }

    async cancelLead() {
        await this.cancelButton.click();
    }
    //edit lead form
    async openEditLeadForm(name: string) {
        const leadRow = this.leadRows.filter({ hasText: name });
        await leadRow.getByTestId('edit-button').click();
        await expect(this.leadModal).toBeVisible();
    }
    async deleteLead(name: string) {
        const leadRow = this.leadRows.filter({ hasText: name });
        await leadRow.getByTestId('delete-button').click();
    }
}