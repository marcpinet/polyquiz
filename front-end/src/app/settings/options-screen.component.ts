import { Component, ElementRef, Renderer2, RendererFactory2 } from '@angular/core';

@Component({
  selector: 'app-options-screen',
  templateUrl: './options-screen.component.html',
})
export class OptionsScreenComponent {
  private renderer: Renderer2;

  public defaultSettings = {
    soundEffects: true,
    spacebarClick: false,
    mouseClickType: 'doubleClick',
    mouseSpeed: 5,
    confirmDialog: true,
  };

  public settings = { ...this.defaultSettings };

  constructor(rendererFactory: RendererFactory2, private el: ElementRef) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public resetSettings(): void {
    this.settings = { ...this.defaultSettings };
  }

  public saveSettings(): void {
    console.log('Settings saved:', this.settings);

    // TODO: Update the settings
  }

  public settingsChanged(): boolean {
    return JSON.stringify(this.settings) !== JSON.stringify(this.defaultSettings);
  }

}
