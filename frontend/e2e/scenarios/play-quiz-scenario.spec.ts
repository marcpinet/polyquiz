import { expect, test } from '@playwright/test';
import { testQuiz, testResultRegex, testUrl } from 'e2e/e2e.config';
import { loginUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';
import { webkit } from 'playwright';
import { PlayedQuizFixture } from 'src/app/playedQuiz/played-quiz-fixture.component';

test.describe('Quiz tests', () => {
  test('test Quiz', async ({ page }) => {
    await page.setViewportSize({
      width: 1920 * (3 / 4),
      height: 1080 * (3 / 4),
    });
    const playedQuizComponentFixture = new PlayedQuizFixture();

    await page.goto(testUrl);

    await page.type('#username', 'user');

    await page.type('#password', '123456');

    await page.click('button:text(" Se connecter ")');

    await page.click('button[data-tab="PARAMETRES"]');

    await page.click('#activer_pression_longue');

    await page.click('#sauvegarder');

    //On commence a utiliser la barre espace
    await new Promise((resolve) => setTimeout(resolve, 2500));
    var currentButton = await page.$('button[data-tab="QUIZ"]');
    var currentuttonBoundingBox = await currentButton.boundingBox();
    await playedQuizComponentFixture.CliquePressionLongue(
      page,
      currentuttonBoundingBox
    );

    currentButton = await page.$('#theme');
    currentuttonBoundingBox = await currentButton.boundingBox();
    await playedQuizComponentFixture.CliquePressionLongue(
      page,
      currentuttonBoundingBox
    );

    //await page.dblclick('#theme');

    //await page.selectOption('select', 'Géographie');

    currentButton = await page.$('button:has-text("OK")');
    currentuttonBoundingBox = await currentButton.boundingBox();
    await playedQuizComponentFixture.CliquePressionLongue(
      page,
      currentuttonBoundingBox
    );

    //await page.dblclick('button:has-text("OK")');

    currentButton = await page.$('app-quiz-details');
    currentuttonBoundingBox = await currentButton.boundingBox();
    await playedQuizComponentFixture.CliquePressionLongue(
      page,
      currentuttonBoundingBox
    );

    //await page.dblclick('app-quiz-details');

    await page.waitForSelector(
      'text=VRAI ou FAUX ? La ville du Vatican, capitale du Vatican, a le taux de crime le plus faible au monde.'
    );

    currentButton = await page.$('#faux');
    currentuttonBoundingBox = await currentButton.boundingBox();
    await playedQuizComponentFixture.CliquePressionLongue(
      page,
      currentuttonBoundingBox
    );

    //await page.dblclick('#faux');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    currentButton = await page.$('button:text("Suivant")');
    currentuttonBoundingBox = await currentButton.boundingBox();
    await playedQuizComponentFixture.CliquePressionLongue(
      page,
      currentuttonBoundingBox
    );

    //await page.dblclick('button:text("Suivant")');

    //Passer sur la barre espace

    currentButton = await page.$('button[data-tab="navbarParam"]');
    currentuttonBoundingBox = await currentButton.boundingBox();
    await playedQuizComponentFixture.CliquePressionLongue(
      page,
      currentuttonBoundingBox
    );

    //await page.dblclick('button[data-tab="PARAMETRES"]');

    currentButton = await page.$('#activer_double_clic');
    currentuttonBoundingBox = await currentButton.boundingBox();
    await playedQuizComponentFixture.CliquePressionLongue(
      page,
      currentuttonBoundingBox
    );

    //await page.dblclick('#activer_double_clic');

    await page.waitForSelector('text=Sauvegarder');
    currentButton = await page.$('[data-tab="save"]');
    currentuttonBoundingBox = await currentButton.boundingBox();
    //await playedQuizComponentFixture.CliquePressionLongue(page, currentuttonBoundingBox);
    //comme le bouton n'apparaît pas entièrement sur la page, on est obligé de cliquer sur le haut de ce dernier, d'où le -50
    await page.mouse.move(
      currentuttonBoundingBox.x + currentuttonBoundingBox.width / 2,
      currentuttonBoundingBox.y - 50 + currentuttonBoundingBox.height / 2
    );
    //for (let i = 0; i < 20000; i++) {
    //  await page.mouse.click(currentuttonBoundingBox.x + currentuttonBoundingBox.width / 2, currentuttonBoundingBox.y + currentuttonBoundingBox.height / 2);
    //}
    await page.mouse.down();
    await new Promise((resolve) => setTimeout(resolve, 800)); // Maintenir le clic pendant 0.8 seconde
    await page.mouse.up();
    await new Promise((resolve) => setTimeout(resolve, 2500));

    //currentButton = await page.$('#closePopup');
    //await page.dblclick('button[data-tab="closePopup"]');

    //await page.dblclick('#sauvegarder');

    //retour au quiz

    await page.dblclick('[data-number="quatre"]');

    await page.click('[data-number="un"]');

    await page.dblclick('[data-number="quatre"]');

    await page.dblclick('button:text("Suivant")');

    //double clique

    await page.click('[data-number="un"]');

    await page.dblclick('[data-number="trois"]');

    await page.dblclick('[data-number="trois"]');

    await page.dblclick('button:text("Suivant")');

    expect((await page.textContent('#correct')).trim()).toBe('3');

    expect((await page.textContent('#incorrect')).trim()).toBe('0');

    expect(page.url()).toMatch(testResultRegex);
  });

  test('ResetParams', async ({ page }) => {
    await page.setViewportSize({
      width: 1920 * (3 / 4),
      height: 1080 * (3 / 4),
    });

    await page.goto(testUrl);

    await page.type('#username', 'user');

    await page.type('#password', '123456');

    await page.click('button:text(" Se connecter ")');

    await page.dblclick('button[data-tab="PARAMETRES"]');

    await page.dblclick('#desactiver_souris');

    await page.dblclick('#sauvegarder');
  });
});

test.describe('Main page tests', () => {
  test('Informations about main page', async ({ page }) => {
    await page.goto(loginUrl);
    const appComponentFixture = new AppFixture();

    await test.step('Connexion', async () => {
      appComponentFixture.ConnexionAsUser(page);
      await page.waitForSelector('text=Les capitales européennes');
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
      //Utilisation de la fonction locator pour trouver la bonne instance
      await page.locator('text=Progrès').nth(1);
      await page.waitForSelector('text=Thème');
      await page.waitForSelector('text=Durée');
    });

    await test.step('Resultats', async () => {
      await page.getByRole('button', { name: 'Mes résultats' }).click();
      await page.locator('text=Score').nth(1);
      await page.locator('text=Taux de réussite').nth(1);
    });

    await test.step('Paramètres', async () => {
      await page.getByRole('button', { name: 'Paramètres' }).click();
      await page.locator('text=Paramètres').nth(4);
      //await page.waitForSelector('text=Options de clic de la souris');
      await page.locator('text=Options de clic de la souris').nth(1);
      await page.locator('text=Action au microphones').nth(1);
      await page.locator('text=Confirmation avant de valider').nth(1);
      //await page.waitForSelector('text=Action au microphones');
      //await page.waitForSelector('text=Confirmation avant de valider');
      await page.getByRole('button', { name: 'Quiz' }).click();
    });

    await test.step('Aide', async () => {
      await page.getByRole('button', { name: 'Aide' }).click();
      await page.waitForSelector('text=Comment modifier les paramètres ?');
      await page.getByRole('button', { name: 'Fermer' }).click();
    });

    await test.step('Profil', async () => {
      await page.getByRole('navigation').getByRole('img').click();
      await page.waitForSelector('text=Date de naissance');
      await page.waitForSelector('text=1950-01-01');
      await page.waitForSelector('text=Sexe');
      await page.waitForSelector('text=masculin');
      await page.waitForSelector('text=Statistiques');
    });

    await test.step('Deconnexion', async () => {
      await page.getByRole('button', { name: 'Se Déconnecter' }).click();
    });
  });
});
