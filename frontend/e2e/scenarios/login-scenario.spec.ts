import { test } from '@playwright/test';
import { loginUrl } from 'e2e/e2e.config';

const fakeUsername = 'fakeUsername';
const fakePassword = 'fakePassword';
const correctUsername = 'user';
const correctPassword = '123456';

test.describe('Login page tests', () => {
  test('Test invalid username, invalid password, and successful login', async ({
    page,
  }) => {
    await page.goto(loginUrl);

    await test.step('Enter an incorrect username and password', async () => {
      await page.fill('#username', fakeUsername);
      await page.fill('#password', correctPassword);
      await page.click('text=Se connecter');
    });

    await test.step('Check for username error', async () => {
      await page.waitForSelector('text=Mauvais identifiant');
      await page.click('text=Retour');
    });

    await test.step('Enter a correct username and an incorrect password', async () => {
      await page.fill('#username', correctUsername);
      await page.fill('#password', fakePassword);
      await page.click('text=Se connecter');
    });

    await test.step('Check for password error', async () => {
      await page.waitForSelector('text=Mauvais mot de passe');
      await page.click('text=Retour');
    });

    await test.step('Enter a correct username and password', async () => {
      await page.fill('#username', correctUsername);
      await page.fill('#password', correctPassword);
      await page.click('text=Se connecter');
    });

    await test.step('Check for successful login', async () => {
      await page.waitForSelector('li#quiz-btn');
    });
  });
});
