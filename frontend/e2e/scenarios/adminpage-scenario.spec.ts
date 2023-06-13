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

    //TODO new admin profil

    await test.step('AdminProfil', async () => {
      await page.getByRole('navigation').getByRole('img').first().click();
      await page.locator('text=Score').nth(1);
      await page.locator('text=Taux de réussite').nth(1);
      await page.getByRole('button').first().click();
    });

    await test.step('UserProfil', async () => {
      await page.getByPlaceholder(
        "Entrez le nom du résident ou son numéro d'identification"
      );
      await page.getByRole('cell', { name: 'user user user' }).click();
      await page.waitForSelector('text=Date de naissance');
      await page.waitForSelector('text=Troubles');
      await page.waitForSelector("text=Total du nombre d'essais");
    });

    await test.step('Modifier le profil', async () => {
      await page.getByRole('button', { name: 'Modifier le profil' }).click();
      await page.waitForSelector('text=Modifier Compte Du Résident user user');
      await page.waitForSelector('text=Information généraux');
      await page.waitForSelector('text=Symtômes');
      await page.waitForSelector('text=Effet sonore: Étendu');
      await page.getByRole('button').first().click();
    });

    await test.step('Deconnexion', async () => {
      await page.getByRole('navigation').getByRole('img').first().click();
      await page.getByRole('button', { name: 'Se Déconnecter' }).click();
    });
  });
});
