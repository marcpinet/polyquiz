import { Component} from '@angular/core';
import { InitSettings, Settings } from 'src/models/settings.model';
import { InitSettingService } from 'src/services/initsettings.service';
import { SettingService } from 'src/services/settings.service';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-options-screen',
  templateUrl: './options-screen.component.html',
})
export class OptionsScreenComponent {
  sound_effect: boolean;
  keyboard_control: boolean;
  mouse_option: 'doubleClique' | 'pressionLongue' | 'aucun';
  microphone: boolean;
  confirm_answer: boolean;

  initSettings: InitSettings;
  settings: Settings;

  constructor(
    private initSettingService: InitSettingService,
    private settingService: SettingService,
    private authService: AuthService,
  ) {
    const userId = this.authService.user.id;
    console.log('userId', userId);
    this.initSettingService.setSelectedInitSetting(userId.toString());
    this.initSettingService.initsettingsSelected$.subscribe((initSettings) => {
      this.initSettings = initSettings;
      console.log('initSettings', initSettings);
    });
    this.settingService.settings$.subscribe((settings) => {
      this.settings = settings;
      console.log('settings', settings);
      this.renderSettings();
    });
  }

  renderSettings() {
    this.sound_effect = this.settings.sound_effect;
    this.keyboard_control = this.settings.keyboard_control;
    this.mouse_option = this.settings.mouse_option;
    this.microphone = this.settings.microphone;
    this.confirm_answer = this.settings.confirm_answer;
  }

  resetSettings() {
    this.sound_effect = this.initSettings.sound_effect;
    this.keyboard_control = this.initSettings.keyboard_control;
    this.mouse_option = this.initSettings.mouse_option;
    this.microphone = this.initSettings.microphone;
    this.confirm_answer = this.initSettings.confirm_answer;
  }

  soundEffect() {
    this.sound_effect = !this.sound_effect;
  }

  setMouseOption(option: 'doubleClique' | 'pressionLongue' | 'aucun') {
    this.mouse_option = option;
  }

  setMicrophone(boolean: boolean) {
    this.microphone = boolean;
  }

  setConfirmAnswer(boolean: boolean) {
    this.confirm_answer = boolean;
  }

  setKeyBoardControl(boolean: boolean) {
    this.keyboard_control = boolean;
  }

  saveSettings() {
    this.settings.sound_effect = this.sound_effect;
    this.settings.keyboard_control = this.keyboard_control;
    this.settings.mouse_option = this.mouse_option;
    this.settings.microphone = this.microphone;
    this.settings.confirm_answer = this.confirm_answer;
    this.settingService.updateSettings(this.settings).subscribe({
      next: (updatedSettings) => {
        console.log('Settings updated:', updatedSettings);
        this.settings = updatedSettings;
        Swal.fire({
          icon: 'success',
          title: 'Paramètres sauvegardés',
          showConfirmButton: false,
          timer: 1500
        })
        this.renderSettings();
      },
      error: (error) => {
        console.error('Error updating settings:', error);
      },
    });
  }
}
