import { test } from '@playwright/test';
import { loginUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

const appComponentFixture = new AppFixture();
var username = appComponentFixture.generateRandomUsername(15);

test.describe('Create a quiz scenario', () => {
  test('Create the quiz', async ({ page }) => {
    await page.goto(loginUrl);

    await test.step('Connexion', async () => {
      appComponentFixture.ConnexionAsAdmin(page);
    });

    await test.step('Acces page create quiz', async () => {
      await page.getByRole('button', { name: 'Gestion Quiz' }).click();
      await page.getByRole('button', { name: 'Mes Quiz' }).click();
      await page.getByRole('button', { name: 'Créer Quiz' }).click();
      await page.getByRole('heading', { name: 'Créer Un Quiz' });
    });

    await test.step('Quitter un quiz', async () => {
      await page.getByRole('navigation').getByRole('button').first().click();
      await page.waitForSelector(
        'text=Êtes-vous sûr de vouloir quitter la page ?'
      );
      await page.click('text=Non, rester');
    });

    await test.step('Remplir informations quiz', async () => {
      await page.fill('#quizImage', 'image quiz');
      await page.fill('#quizName', 'nom du quiz');
      await page
        .locator('div')
        .filter({ hasText: /^Facile$/ })
        .getByRole('radio')
        .click();
      await page.fill('#message', 'description du quiz');
      await page.fill('#estimatedTime', '5');
      await page.getByRole('combobox').click();
      await page.selectOption('role=combobox', { label: 'Géographie' });
    });

    await test.step('Ajouter une question', async () => {
      await page.getByRole('button', { name: 'Ajouter une question' }).click();
      //Question 1
      await page.fill('#questionIntitule', 'intitule question 1');
      await page.fill('#questionImage', 'Image de la question');
      await page.fill('#reponse1', 'reponse 1 Q1');
      await page.fill('#reponse1Image', 'image reponse 1 Q1');
      await page.fill('#reponse2', 'reponse 2 Q1');
      await page.fill('#reponse2Image', 'image reponse 2 Q1');
      await page.fill('#reponse3', 'reponse 3 Q1');
      await page.fill('#reponse3Image', 'image reponse 3 Q1');
      await page.locator('#reponseVraie2').click();
      await page.fill('#reponse4', 'reponse 4 Q1');
      await page.fill('#reponse4Image', 'image reponse 4 Q1');
      await page.fill('#explicationReponse', 'explication reponse Q1');
      await page.fill('#explicationImage', 'image explication reponse Q1');
      await page.getByRole('button', { name: 'Ajouter question' }).click();

      //Question 2
      await page.getByRole('button', { name: 'Ajouter une question' }).click();
      await page.fill('#questionIntitule', 'intitule question 2');
      await page.fill('#questionImage', 'Image de la question');
      await page.fill('#reponse1', 'reponse 1 Q2');
      await page.fill('#reponse1Image', 'image reponse 1 Q2');
      await page.fill('#reponse2', 'reponse 2 Q2');
      await page.fill('#reponse2Image', 'image reponse 2 Q2');
      await page.locator('#reponseVraie1').click();
      await page.fill('#reponse3', 'reponse 3 Q2');
      await page.fill('#reponse3Image', 'image reponse 3 Q2');
      await page.fill('#explicationReponse', 'explication reponse Q2');
      await page.fill('#explicationImage', 'image explication reponse Q2');
      await page.getByRole('button', { name: 'Ajouter question' }).click();

      //Question 3
      await page.getByRole('button', { name: 'Ajouter une question' }).click();
      await page.fill('#questionIntitule', 'intitule question 3');
      await page.fill('#questionImage', 'Image de la question');
      await page.fill('#reponse1', 'reponse 1 Q3');
      await page.fill('#reponse1Image', 'image reponse 1 Q3');
      await page.fill('#reponse2', 'reponse 2 Q3');
      await page.fill('#reponse2Image', 'image reponse 2 Q3');
      await page.locator('#reponseVraie2').click();
      await page.fill('#explicationReponse', 'explication reponse Q3');
      await page.fill('#explicationImage', 'image explication reponse Q3');
      await page.getByRole('button', { name: 'Ajouter question' }).click();
    });

    await test.step('Supprimer question', async () => {
      await page.getByRole('button', { name: 'Supprimer' }).nth(1).click();
    });

    await test.step('Modifier question', async () => {
      await page.getByRole('button', { name: 'Modifier' }).nth(1).click();
      await page.fill('#questionIntitule', 'intitule question 2');
      await page.fill('#reponse1', 'reponse 1 Q2');
      await page.fill('#reponse1Image', 'image reponse 1 Q2');
      await page.fill('#reponse2', 'reponse 2 Q2');
      await page.locator('#reponseVraie1').click();
      await page.fill('#reponse2Image', 'image reponse 2 Q2');
      await page.fill('#explicationReponse', 'explication reponse Q2');
      await page.fill('#explicationImage', 'image explication reponse Q2');
      await page.getByRole('button', { name: 'Ajouter question' }).click();
    });

    await test.step('Valider creation quiz', async () => {
      await page.getByRole('button', { name: 'Sauvegarder' }).click();
      //await page.getByRole('navigation').getByRole('button').first().click();
      //await page.waitForSelector(
      //  'text=Êtes-vous sûr de vouloir quitter la page ?'
      //);
      //await page.click('text=Oui, quitter');
    });
  });
});

test.describe('Verifier creation de quiz', () => {
  test('Create the user', async ({ page }) => {
    await page.goto(loginUrl);

    await test.step('Connexion', async () => {
      appComponentFixture.ConnexionAsAdmin(page);
    });

    await test.step('Verifier creation quiz', async () => {
      await page.getByRole('button', { name: 'Gestion Quiz' }).click();
      await page.getByRole('button', { name: 'Mes Quiz' }).click();
      await page.waitForSelector('text=nom du quiz');
    });
  });
});

test.describe('Create a new user', () => {
  test('Create the user', async ({ page }) => {
    await page.goto(loginUrl);
    const appComponentFixture = new AppFixture();

    await test.step('Connexion', async () => {
      appComponentFixture.ConnexionAsAdmin(page);
    });

    await test.step('Acces a la page de creation de resident', async () => {
      await page.getByRole('button', { name: 'Créer compte résident' }).click();
    });

    await test.step('Remplir page de création du résident', async () => {
      await page.fill('#residentPicture', 'photo nouveau résident');
      await page.fill('#residentName', 'NomRésident');
      await page.fill('#residentFirstName', 'PrénomRésident');
      await page
        .locator('div')
        .filter({ hasText: /^Masculin$/ })
        .getByRole('radio')
        .click();
      await page.getByLabel('Symptôme(s) du résident').click();
      await page
        .locator('div')
        .filter({ hasText: /^Rigidité$/ })
        .locator('#symptome')
        .click();
      const parts = '01/01/1950'.split('/');
      const formattedDate = `${parts[0]}-${parts[1]}-${parts[2]}`;
      await page.type('#residentDateOfBirth', formattedDate);
      await page.fill('#residentUserName', username);
      await page.fill('#residentPassword', '123456');
      await page.fill('#residentConfirmPassword', '123456');
      await page.getByRole('button', { name: 'Enregistrer' }).click();
    });

    await test.step('Verification existance', async () => {
      const searchResident = page.getByPlaceholder(
        "Entrez le nom du résident ou son numéro d'identification"
      );
      await page.getByTestId('searchResident').type(username);
      //await page.fill('#searchResident', username);
      await page.waitForSelector('text=NomRésident');
      await page.waitForSelector('text=PrénomRésident');
      await page.waitForSelector('text=' + username);
    });

    await test.step('Deconnexion', async () => {
      await page.getByRole('navigation').getByRole('img').first().click();
      await page.getByRole('button', { name: 'Se Déconnecter' }).click();
    });

    await test.step('Connexion avec le nouvel utilisateur', async () => {
      await page.fill('#username', username);
      await page.fill('#password', '123456');
      await page.click('text=Se connecter');
      await page.waitForSelector('li#quiz-btn');
    });
  });
});

test.describe('Modify a user', () => {
  test('Modify the user', async ({ page }) => {
    await page.goto(loginUrl);

    await test.step('Connexion', async () => {
      appComponentFixture.ConnexionAsAdmin(page);
    });

    await test.step('Acces a la page de modification de resident', async () => {
      await page.getByTestId('searchResident').type(username);
      await page.getByRole('cell', { name: username }).click();
      await page.getByRole('button', { name: 'Modifier le profil' }).click();
      await page
        .getByRole('button', {
          name: 'Sexe: masculin Date de naissance: 1950-01-01',
        })
        .click();
    });

    await test.step('Modifier les infos résidents', async () => {
      //On vide le champ avant de le remplir
      await page.getByTestId('modifyPP').fill('');
      await page
        .getByTestId('modifyPP')
        .type(
          'https://static.wikia.nocookie.net/heros/images/2/24/Mettaton_EX.png/revision/latest?cb=20210422115610&path-prefix=fr'
        );

      await page.getByTestId('modifySex').click();
      await page.selectOption('role=combobox', { label: 'Féminin' });
      await page.getByTestId('modifySex').click();

      const parts = '02/10/1954'.split('/');
      const formattedDate = `${parts[0]}-${parts[1]}-${parts[2]}`;
      await page.getByTestId('modifyDOB').fill('');
      await page.getByTestId('modifyDOB').type(formattedDate);
      await page
        .getByRole('button', { name: 'Mettre à jour le profil' })
        .click();
    });
  });
});

test.describe('Verify user modification', () => {
  test('Modify the user', async ({ page }) => {
    await page.goto(loginUrl);

    await test.step('Connexion', async () => {
      appComponentFixture.ConnexionAsAdmin(page);
    });

    await test.step('Acces a la page de modification de resident', async () => {
      await page.getByTestId('searchResident').type(username);
      await page.getByRole('cell', { name: username }).click();
    });

    await test.step('Verifier informations mise à jour', async () => {
      await page.waitForSelector('text="Féminin"');
      await page.waitForSelector('text="1954-10-02"');
    });
  });
});
