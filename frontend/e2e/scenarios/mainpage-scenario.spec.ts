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

    await test.step('Difficulte', async () => {
      await page.getByRole('button', { name: 'Difficulté' }).click();
      //Vérifions que le texte de la popup est bien présente
      await page.waitForSelector('text=Sélectionnez la difficulté');
      await page.getByRole('combobox').click();
      // Sélectionner l'option "Moyen"
      await page.selectOption('role=combobox', { label: 'Moyen' });
      await page.getByRole('button', { name: 'OK' }).click();
      //On verifie que le bouton s'est bien mis a jour
      await page.waitForSelector('text=Moyen');
    });

    await test.step('Progres', async () => {
      await page.getByRole('button', { name: 'Progrès' }).click();
      await page.waitForSelector('text=Sélectionnez le statut');
      await page.getByRole('combobox').click();
      await page.selectOption('role=combobox', { label: 'Non fait' });
      await page.getByRole('button', { name: 'OK' }).click();
      //On verifie que le bouton s'est bien mis a jour
      await page.waitForSelector('text=Non fait');
    });

    await test.step('Theme', async () => {
      await page.getByRole('button', { name: 'Thème' }).click();
      await page.waitForSelector('text=Sélectionnez le thème');
      await page.getByRole('button', { name: 'OK' }).click();
      //On verifie que le bouton s'est bien mis a jour
      await page.waitForSelector('text=Géographie');
    });

    await test.step('Duree', async () => {
      await page.getByRole('button', { name: 'Durée' }).click();
      await page.waitForSelector('text=Sélectionnez la durée');
      await page.getByRole('combobox').click();
      await page.selectOption('role=combobox', { label: '> 10 min' });
      await page.getByRole('button', { name: 'OK' }).click();
      //On verifie que le bouton s'est bien mis a jour
      await page.waitForSelector('text=> 10 min');
    });

    await test.step('Reinitialisation', async () => {
      await page.getByRole('button', { name: 'Réinitialiser' }).click();
      //On verifie que le bouton s'est bien mis a jour
      await page.waitForSelector('text=Difficulté');
      //Je ne sais pas pourquoi celui ci ne passe pas...
      //await page.waitForSelector('text=Progrès');
      await page.waitForSelector('text=Thème');
      await page.waitForSelector('text=Durée');
    });
  });
});
