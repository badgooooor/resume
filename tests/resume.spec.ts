import { expect, test } from '@playwright/test';

test('index page shows résumé title', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Resumette' })).toBeVisible();
});

test('work experience section is present', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Work Experience' })).toBeVisible();
});
