import { E2EComponentFixture } from 'e2e/component.fixture';

export class PlayedQuizFixture extends E2EComponentFixture {
  async CliquePressionLongue(page, currentuttonBoundingBox) {
    await page.mouse.move(
      currentuttonBoundingBox.x + currentuttonBoundingBox.width / 2,
      currentuttonBoundingBox.y + currentuttonBoundingBox.height / 2
    );
    await page.mouse.down();
    await new Promise((resolve) => setTimeout(resolve, 800)); // Maintenir le clic pendant 0.8 seconde
    await page.mouse.up();
  }
}
