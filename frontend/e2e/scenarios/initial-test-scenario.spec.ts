import { expect, test } from '@playwright/test';
import { testQuiz, testUrl } from 'e2e/e2e.config';

// This file is here to test the playwright integration.
test.describe('Initial test display', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(testUrl);
    // Let's try with something you don't have in your page.
    const pageTitle = await page.getByRole('heading', {
      name: 'AGreatHeadingNameYouDontHave',
    });
    // It should not be visible as you don't have it in your page.
    expect(pageTitle).not.toBeVisible();
    // Test case pass? Means the playwright setup is done! Congrats!
  });

  test('test Quiz', async ({ page }) => {
    await page.goto(testUrl);

    await page.type('#username', 'gekomoria');

    await page.type('#password', '123456');

    await page.click('button:text(" Se connecter ")');

    await page.click('app-quiz-details');

    expect(page.url()).toBe(testQuiz);

    await page.click('#vrai');

    await page.click('#vrai');

    await page.click('button:text("Suivant")');

    await page.click('[data-number="un"]');

    await page.click('[data-number="un"]');

    await page.click('button:text("Suivant")');

    await page.click('[data-number="deux"]');

    await page.click('[data-number="deux"]');

    await page.click('button:text("Suivant")');
  });
});
