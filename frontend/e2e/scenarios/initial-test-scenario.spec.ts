import { expect, test } from '@playwright/test';
import { testQuiz, testResultRegex, testUrl } from 'e2e/e2e.config';
import { webkit } from 'playwright';

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
});

test.describe('Quiz tests', () => {
  test('test Quiz', async ({ page }) => {
    await page.setViewportSize({
      width: 1920 * (3 / 4),
      height: 1080 * (3 / 4),
    });

    await page.goto(testUrl);

    await page.type('#username', 'gekomoria');

    await page.type('#password', '123456');

    await page.click('button:text(" Se connecter ")');

    await page.click('button[data-tab="PARAMETRES"]');

    await page.click('#activer_double_clic');

    await page.click('#sauvegarder');

    await page.dblclick('button[data-tab="QUIZ"]');

    await page.dblclick('#theme');

    await page.selectOption('select', 'Géographie');

    await page.dblclick('button:has-text("OK")');

    await page.dblclick('app-quiz-details');

    expect(page.url()).toBe(testQuiz);

    await page.dblclick('#faux');

    await page.dblclick('#faux');

    await page.dblclick('button:text("Suivant")');

    await page.dblclick('[data-number="quatre"]');

    await page.dblclick('[data-number="quatre"]');

    await page.dblclick('button:text("Suivant")');

    await page.dblclick('[data-number="trois"]');

    await page.dblclick('[data-number="trois"]');

    await page.dblclick('button:text("Suivant")');

    expect(page.url()).toMatch(testResultRegex);

    await page.dblclick('img');
  });
});
