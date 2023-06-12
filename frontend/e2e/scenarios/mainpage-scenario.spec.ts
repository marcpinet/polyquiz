import { test } from '@playwright/test';
import { loginUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Main page tests', () => {
  test('Informations about main page', async ({ page }) => {
    await page.goto(loginUrl);
    const appComponentFixture = new AppFixture();

    await test.step('Connexion', async () => {
      appComponentFixture.ConnexionAsUser(page);
    });

    await test.step('Check for successful login', async () => {
      await page.waitForSelector('li#quiz-btn');
    });

    await test.step('Filtres', async () => {
      await page.click('Difficulté');
    });
  });
});
