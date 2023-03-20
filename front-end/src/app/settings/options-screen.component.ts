import { Component } from '@angular/core';

@Component({
  selector: 'app-options-screen',
  templateUrl: './options-screen.component.html',
})
export class OptionsScreenComponent {
  public defaultSettings = {
    soundEffects: true,
    spacebarClick: false,
    mouseClickType: 'doubleClick',
    mouseSpeed: 5,
    confirmDialog: true,
  };

  public settings = { ...this.defaultSettings };

  public resetSettings(): void {
    this.settings = { ...this.defaultSettings };
  }

  public saveSettings(): void {
    console.log('Settings saved:', this.settings);
  }
}
