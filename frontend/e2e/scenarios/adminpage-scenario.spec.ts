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

      await page.waitForSelector('text=Mes résidents');
      // Sélectionner l'option "Moyen"
      await page.selectOption('role=combobox', { label: 'Moyen' });
      await page.getByRole('button', { name: 'OK' }).click();
      //On verifie que le bouton s'est bien mis a jour
      await page.waitForSelector('text=Moyen');
    });

    await test.step('Deconnexion', async () => {
      await page.getByRole('button', { name: 'Se Déconnecter' }).click();
    });
  });
});
