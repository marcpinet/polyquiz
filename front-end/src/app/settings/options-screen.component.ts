import { Component, Renderer2, OnDestroy } from '@angular/core';
import { SpeechService } from '../../services/speech.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-options-screen',
  templateUrl: './options-screen.component.html',
})
export class OptionsScreenComponent implements OnDestroy {
  isMuted: boolean = false;
  private letterASubscription: Subscription;

  public defaultSettings = {
    vocal: true,
    spacebarClick: false,
    mouseClickType: 'doubleClick',
    mouseSpeed: 5,
    confirmDialog: true,
  };

  public settings = { ...this.defaultSettings };

  constructor(
    private renderer: Renderer2,
    private speechService: SpeechService
  ) {
    this.letterASubscription = this.speechService.letterADetected.subscribe(
      (speechText) => {
        this.handleClick(speechText);
      }
    );
  }

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

  ngOnDestroy() {
    this.letterASubscription.unsubscribe();
  }

  listenAndClick() {
    this.speechService.startRecognition();
  }

  handleClick(speechText: string) {
    console.log('Clicked!');
    console.log('User speech:', speechText);
    // Code to execute when the click is triggered
  }
}
