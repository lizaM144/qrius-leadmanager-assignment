# Test Findings

## Searching by company name filters the leads list (`search.spec.ts`)
- **Expected:** Searching for a company name should show the lead belonging to that company
- **Received:** Searching for a lead's name works, but searching by company name does not return matching leads.
- **Judgement:** The application has a bug.
- **Reason:** The search input only searches for lead name and does not search the company field, even though company name searching was expected to work.

## Lead count updates when searching (`search.spec.ts`)
- **Expected:** Searching for a specific lead should update the count form `Showing 12 of 12 leads` to `Showing 1 of 1 lead`.
- **Received:** Even if the matching lead is displayed, but the count is still showing `Showing 12 of 12 leads`.
- **Judgement:** The application has a bug.
- **Reason:** The search result if filtered correctly, but the lead-count value is not updated upon each search.

## Adding a lead with selected status (`add-lead.spec.ts`)
- **Expected:** Adding a lead with a status such as `Qualified` should display that lead with `Qualified` status in the list.
- **Received:** The lead is successfully added, but the status is displayed `New` instead of `Qualified`.
- **Judgement:** The application has a bug.
- **Reason:** The test selectes a different status before saving, but the application saves the new lead with default `New` status.

## Lead count assertion failed because test order was not guaranteed (`add-lead.spec.ts`)
- **Expected:** After adding a lead, the lead count should be `Showing 13 of 13 leads`.
- **Received:** The test received `Showing 14 of 14 leads`.
- **Judgement:** My test is wrong.
- **Reason:** Playwright does not guarantee that tests run in the order they are written, so the second test had already added a lead before the count assertion ran. The test incorrectly assumed that the database still contained only 12 leads.

## Add lead form validates user input (`add-lead.spec.ts` and `edit-lead.spec.ts`)
- **Expected:** The form should validate required fields and reject invalid values such as numbers in name field and invalid email address.
- **Received:** The form accepts invalid email values, numbers as names, and shows no warning when required fields are left empty.
- **Judgement:** The application has a bug.
- **Reason:** The form accepts invalid or missing input with no validation checks.