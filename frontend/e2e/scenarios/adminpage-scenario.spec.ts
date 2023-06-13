import { test } from '@playwright/test';
import { loginUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Main page tests', () => {
  test('Informations about main page', async ({ page }) => {
    await page.goto(loginUrl);
    const appComponentFixture = new AppFixture();

    await test.step('Connexion', async () => {
      appComponentFixture.ConnexionAsAdmin(page);
    });

    await test.step('AdminPageElements', async () => {
      //await page.getByRole('button', { name: 'Difficulté' }).click();
      await page.getByRole('img').first();
      await page.waitForSelector('text=Mes résidents');
      await page.waitForSelector('text=Gestion Quiz');
      await page.getByRole('button', { name: '0' });
      await page.getByRole('navigation').getByRole('img');
      await page.waitForSelector('text=admin admin');
      await page.waitForSelector('text=1 / 1');
      await page.getByRole('cell', { name: '1680382334189' });
      await page.getByRole('navigation').getByRole('img').click();
    });

    await test.step('AdminAide', async () => {
      await page.getByRole('button', { name: 'Aide' }).click();
      await page.waitForSelector('text=Comment modifier les paramètres ?');
      await page.waitForSelector('text=Comment suivre mes progrès ?');
      await page.waitForSelector('text=Les différents paramètres');
      await page.waitForSelector('text=Options de clics de souris :');
      await page.waitForSelector('text=Action au microphone :');
      await page.waitForSelector('text=Clics avec barre espace :');
      await page.waitForSelector('text=Confirmation avant de valider :');
      await page.getByRole('button', { name: 'Fermer' }).click();
    });

    await test.step('AdminParamètres', async () => {
      await page.getByRole('button', { name: 'Paramètres' }).click();
      await page.locator('text=Options de clic de la souris').nth(1);
      await page.locator('text=Double clique').nth(1);
      await page.locator('text=Pression longue').nth(1);
      await page.locator('text=Clics avec barre espace').nth(1);
      await page.locator('text=Action au microphone').nth(1);
      await page.locator('text=Confirmation avant de valider :').nth(1);
      await page.waitForSelector('text=Sauvegarder');
      await page.getByRole('button', { name: 'Réinitialiser' }).click();
      await page.getByRole('button', { name: '' }).click();
    });

    await test.step('AdminProfil', async () => {
      await page.getByRole('navigation').getByRole('img').first().click();
      await page.locator('text=Score').nth(1);
      await page.locator('text=Taux de réussite').nth(1);
      await page.getByRole('button').first().click();
    });

    await test.step('Deconnexion', async () => {
      await page.getByRole('navigation').getByRole('img').first().click();
      await page.getByRole('button', { name: 'Se Déconnecter' }).click();
    });
  });
});
