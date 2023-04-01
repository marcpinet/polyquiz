import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-options-screen',
  templateUrl: './options-screen.component.html',
})
export class OptionsScreenComponent {
  isMuted: boolean = false;

  public defaultSettings = {
    vocal: true,
    spacebarClick: false,
    mouseClickType: 'doubleClick',
    mouseSpeed: 5,
    confirmDialog: true,
  };

  public settings = { ...this.defaultSettings };

  constructor(private renderer: Renderer2) {}

  public resetSettings(): void {
    this.settings = { ...this.defaultSettings };
  }

  public saveSettings(): void {
    console.log('Settings saved:', this.settings);

    // TODO: Update the settings
  }

  public settingsChanged(): boolean {
    return (
      JSON.stringify(this.settings) !== JSON.stringify(this.defaultSettings)
    );
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    const buttonIcon = this.renderer.selectRootElement('#mute-button i');
    if (this.isMuted) {
      this.renderer.removeClass(buttonIcon, 'fa-volume-up');
      this.renderer.addClass(buttonIcon, 'fa-volume-mute');
    } else {
      this.renderer.removeClass(buttonIcon, 'fa-volume-mute');
      this.renderer.addClass(buttonIcon, 'fa-volume-up');
    }
  }
}
