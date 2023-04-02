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
  selectedMouseOption: string;
  vocal: boolean;
  confirmDialog: boolean;
  spacebarClick: boolean;

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

    this.selectedMouseOption = this.settings.mouseClickType;
    this.vocal = this.settings.vocal;
    this.confirmDialog = this.settings.confirmDialog;
    this.spacebarClick = this.settings.spacebarClick;
  }

  public resetSettings(): void {
    this.settings = { ...this.defaultSettings };
  }

  public saveSettings(): void {
    console.log('Settings saved:', this.settings);

    this.settings.confirmDialog = this.confirmDialog;
    this.settings.spacebarClick = this.spacebarClick;
    this.settings.vocal = this.vocal;
    this.settings.mouseClickType = this.selectedMouseOption;
  }

  public settingsChanged(): boolean {
    return (
      JSON.stringify(this.settings) !== JSON.stringify(this.defaultSettings)
    );
  }

  ngOnDestroy() {
    this.letterASubscription.unsubscribe();
  }

  handleClick(speechText: string) {
    console.log('Clicked!');
    console.log('User speech:', speechText);
    // Code to execute when the click is triggered
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

  setMouseOption(option: string) {
    this.selectedMouseOption = option;
  }

  enableVocal() {
    this.vocal = true;
    this.speechService.startRecognition();
  }

  disableVocal() {
    this.vocal = false;
    this.speechService.stopRecognition();
  }

  enableConfirmDialog() {
    this.confirmDialog = true;
  }

  disableConfirmDialog() {
    this.confirmDialog = false;
  }

  enableSpacebarClick() {
    this.spacebarClick = true;
  }

  disableSpacebarClick() {
    this.spacebarClick = false;
  }
}
