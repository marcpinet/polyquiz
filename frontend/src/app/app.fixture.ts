import { E2EComponentFixture } from 'e2e/component.fixture';

const correctUsername = 'user';
const correctAdminName = 'admin';
const correctPassword = '123456';

export class AppFixture extends E2EComponentFixture {
  async ConnexionAsUser(page) {
    await page.fill('#username', correctUsername);
    await page.fill('#password', correctPassword);
    await page.click('text=Se connecter');
  }

  async ConnexionAsAdmin(page) {
    await page.fill('#username', correctAdminName);
    await page.fill('#password', correctPassword);
    await page.click('text=Se connecter');
  }
}
