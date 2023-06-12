import { E2EComponentFixture } from 'e2e/component.fixture';

const correctUsername = 'user';
const correctAdminName = 'admin';
const correctPassword = '123456';

export class AppFixture extends E2EComponentFixture {
  ConnexionAsUser(page) {
    page.fill('#username', correctUsername);
    page.fill('#password', correctPassword);
    page.click('text=Se connecter');
  }

  ConnexionAsAdmin(page) {
    page.fill('#username', correctAdminName);
    page.fill('#password', correctPassword);
    page.click('text=Se connecter');
  }
}
