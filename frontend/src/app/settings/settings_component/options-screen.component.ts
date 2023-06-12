import { Component, Input } from '@angular/core';
import { InitSettings, Settings } from 'src/models/settings.model';
import { SettingService } from 'src/services/settings.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-options-screen',
  templateUrl: './options-screen.component.html',
})
export class OptionsScreenComponent {
  @Input() settings: Settings;
  @Input() initSettings: InitSettings;

  sound_effect: boolean;
  mouse_option:
    | 'doubleClique'
    | 'pressionLongue'
    | 'keyboard_control'
    | 'aucun';
  microphone: boolean;
  confirm_answer: boolean;

  constructor(
    private settingService: SettingService) {
    console.log('settings', this.settings);
    console.log('initSettings', this.initSettings);
    this.renderSettings();
  }

  renderSettings() {
    this.sound_effect = this.settings.sound_effect;
    this.mouse_option = this.settings.mouse_option;
    this.microphone = this.settings.microphone;
    this.confirm_answer = this.settings.confirm_answer;
  }

  resetSettings() {
    this.sound_effect = this.initSettings.sound_effect;
    this.mouse_option = this.initSettings.mouse_option;
    this.microphone = this.initSettings.microphone;
    this.confirm_answer = this.initSettings.confirm_answer;
  }

  soundEffect() {
    this.sound_effect = !this.sound_effect;
  }

  setMouseOption(
    option: 'doubleClique' | 'pressionLongue' | 'keyboard_control' | 'aucun'
  ) {
    this.mouse_option = option;
  }

  setMicrophone(option: boolean) {
    this.microphone = option;
  }

  setConfirmAnswer(boolean: boolean) {
    this.confirm_answer = boolean;
  }

  saveSettings() {
    this.settings.sound_effect = this.sound_effect;
    this.settings.mouse_option = this.mouse_option;
    this.settings.microphone = this.microphone;
    this.settings.confirm_answer = this.confirm_answer;
    this.settingService.updateSettings(this.settings).subscribe({
      next: (updatedSettings) => {
        console.log('Settings updated:', updatedSettings);
        this.settings = updatedSettings;
        this.settingService.setSettings(this.settings);
        Swal.fire({
          icon: 'success',
          title: 'Paramètres sauvegardés',
          showConfirmButton: false,
          timer: 1500,
        });
        this.renderSettings();
      },
      error: (error) => {
        console.error('Error updating settings:', error);
      },
    });
  }
}
