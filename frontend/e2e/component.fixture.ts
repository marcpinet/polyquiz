import { Page } from '@playwright/test';

export class E2EComponentFixture {
  protected page: Page;

  contructor(page: Page) {
    this.page = page;
  }
}
