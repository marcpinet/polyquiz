import { expect, test } from '@playwright/test';
import { testQuiz, testResultRegex, testUrl } from 'e2e/e2e.config';
import { webkit } from 'playwright';

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

    expect((await page.textContent('#correct')).trim()).toBe('3');

    expect((await page.textContent('#incorrect')).trim()).toBe('0');
  });

  test('ResetParams', async ({ page }) => {
    await page.setViewportSize({
      width: 1920 * (3 / 4),
      height: 1080 * (3 / 4),
    });

    await page.goto(testUrl);

    await page.type('#username', 'gekomoria');

    await page.type('#password', '123456');

    await page.click('button:text(" Se connecter ")');

    await page.dblclick('button[data-tab="PARAMETRES"]');

    await page.dblclick('#desactiver_souris');

    await page.dblclick('#sauvegarder');
  });
});
