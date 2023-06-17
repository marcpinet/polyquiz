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
    const app = new AppFixture();
    const playedQuizComponentFixture = new PlayedQuizFixture();
    await page.goto(testUrl);

    await test.step('Connexion', async () => {
      app.ConnexionAsUser(page);
    });

    await test.step('Sélection du paramètre du clic maintenu de la souris', async () => {
      await page.click('button[data-tab="PARAMETRES"]');
      await page.click('#activer_pression_longue');
      await page.click('#sauvegarder');
      await new Promise((resolve) => setTimeout(resolve, 2500));
    });

    //On commence a utiliser la pression longue
    var currentButton = await page.$('button[data-tab="QUIZ"]');
    var currentuttonBoundingBox = await currentButton.boundingBox();

    await test.step('Lancement du quiz', async () => {
      await playedQuizComponentFixture.CliquePressionLongue(
        page,
        currentuttonBoundingBox
      );

      currentButton = await page.$('app-quiz-details');
      currentuttonBoundingBox = await currentButton.boundingBox();
      await playedQuizComponentFixture.CliquePressionLongue(
        page,
        currentuttonBoundingBox
      );

      await page.waitForSelector(
        'text=VRAI ou FAUX ? La ville du Vatican, capitale du Vatican, a le taux de crime le plus faible au monde.'
      );
    });

    await test.step('Jouer au quiz avec la pression longue', async () => {
      currentButton = await page.$('#faux');
      currentuttonBoundingBox = await currentButton.boundingBox();
      await playedQuizComponentFixture.CliquePressionLongue(
        page,
        currentuttonBoundingBox
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));
      currentButton = await page.$('button:text("Suivant")');
      currentuttonBoundingBox = await currentButton.boundingBox();
      await playedQuizComponentFixture.CliquePressionLongue(
        page,
        currentuttonBoundingBox
      );
    });

    //Passer sur la barre espace

    await test.step('Changement de paramètre pour utiliser la barre espace', async () => {
      currentButton = await page.$('button[data-tab="navbarParam"]');
      currentuttonBoundingBox = await currentButton.boundingBox();
      await playedQuizComponentFixture.CliquePressionLongue(
        page,
        currentuttonBoundingBox
      );

      currentButton = await page.$('#activer_barre_espace');
      currentuttonBoundingBox = await currentButton.boundingBox();
      await playedQuizComponentFixture.CliquePressionLongue(
        page,
        currentuttonBoundingBox
      );

      await page.waitForSelector('text=Sauvegarder');
      currentButton = await page.$('[data-tab="save"]');
      currentuttonBoundingBox = await currentButton.boundingBox();
      //comme le bouton n'apparaît pas entièrement sur la page, on est obligé de cliquer sur le haut de ce dernier, d'où le -50
      await page.mouse.move(
        currentuttonBoundingBox.x + currentuttonBoundingBox.width / 2,
        currentuttonBoundingBox.y - 50 + currentuttonBoundingBox.height / 2
      );
      await page.mouse.down();
      await new Promise((resolve) => setTimeout(resolve, 800)); // Maintenir le clic pendant 0.8 seconde
      await page.mouse.up();
      await new Promise((resolve) => setTimeout(resolve, 2500));
    });

    await test.step('Jeu en utilisant la barre espace', async () => {
      currentButton = await page.$('[data-number="quatre"]');
      currentuttonBoundingBox = await currentButton.boundingBox();
      await playedQuizComponentFixture.CliqueBarreEspace(
        page,
        currentuttonBoundingBox
      );
      await new Promise((resolve) => setTimeout(resolve, 1600));
      //On zoome car le bouton suivant n'est pas visible de base
      await page.evaluate(() => {
        const zoomLevel = 0.75; // Modifier la valeur pour ajuster le niveau de zoom souhaité
        document.documentElement.style.transform = `scale(${zoomLevel})`;
      });
      currentButton = await page.$('button:text("Suivant")');
      currentuttonBoundingBox = await currentButton.boundingBox();
      await playedQuizComponentFixture.CliqueBarreEspace(
        page,
        currentuttonBoundingBox
      );
      //On remet la page a la taille d'origine
      await page.evaluate(() => {
        const zoomLevel = 1; // Modifier la valeur pour ajuster le niveau de zoom souhaité
        document.documentElement.style.transform = `scale(${zoomLevel})`;
      });
    });

    await test.step("Changement d'option pour le double clique", async () => {
      currentButton = await page.$('button[data-tab="navbarParam"]');
      currentuttonBoundingBox = await currentButton.boundingBox();
      await playedQuizComponentFixture.CliqueBarreEspace(
        page,
        currentuttonBoundingBox
      );

      currentButton = await page.$('#activer_double_clic');
      currentuttonBoundingBox = await currentButton.boundingBox();
      await playedQuizComponentFixture.CliqueBarreEspace(
        page,
        currentuttonBoundingBox
      );

      await page.waitForSelector('text=Sauvegarder');
      currentButton = await page.$('[data-tab="save"]');
      currentuttonBoundingBox = await currentButton.boundingBox();
      //comme le bouton n'apparaît pas entièrement sur la page, on est obligé de cliquer sur le haut de ce dernier, d'où le -50
      await page.mouse.move(
        currentuttonBoundingBox.x + currentuttonBoundingBox.width / 2,
        currentuttonBoundingBox.y - 50 + currentuttonBoundingBox.height / 2
      );
      await page.keyboard.press('Space');
      await new Promise((resolve) => setTimeout(resolve, 2500));
    });

    //double clique
    await test.step('Jeu avec le double clique', async () => {
      await page.click('[data-number="un"]');

      await page.dblclick('[data-number="trois"]');

      await page.dblclick('[data-number="trois"]');

      await new Promise((resolve) => setTimeout(resolve, 1600));

      await page.dblclick('button:text("Suivant")');
    });

    await test.step('Verification page de resultat', async () => {
      expect((await page.textContent('#correct')).trim()).toBe('3');

      expect((await page.textContent('#incorrect')).trim()).toBe('0');

      expect(page.url()).toMatch(testResultRegex);
    });
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
      // Sélectionner l'option "Moyen"
      await page.getByLabel('Facile').click();
      await page.getByLabel('Difficile').click();
      await page.getByRole('button', { name: 'Filtrer !' }).click();
      //On verifie que le bouton s'est bien mis a jour
      await page.waitForSelector('text=Moyen');
    });

    await test.step('Progres', async () => {
      await page.getByRole('button', { name: 'Progrès' }).click();
      await page.waitForSelector('text=Sélectionnez le progrès');
      await page.locator('text=Fait').nth(0).click();
      await page.getByRole('button', { name: 'Filtrer !' }).click();
      //On verifie que le bouton s'est bien mis a jour
      await page.waitForSelector('text=Non fait');
    });

    await test.step('Theme', async () => {
      await page.getByRole('button', { name: 'Thème' }).click();
      await page.waitForSelector('text=Sélectionnez le thème');
      await page.getByRole('button', { name: 'Filtrer !' }).click();
      //On verifie que le bouton s'est bien mis a jour
      await page.waitForSelector('text=Thème');
    });

    await test.step('Duree', async () => {
      await page.getByRole('button', { name: 'Durée' }).click();
      await page.waitForSelector('text=Sélectionnez la durée');
      await page.getByLabel('< 5 mins').click();
      await page.getByLabel('5 mins < 10 mins').click();
      await page.getByRole('button', { name: 'Filtrer !' }).click();
      //On verifie que le bouton s'est bien mis a jour
      await page.waitForSelector('text=> 10 mins');
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
