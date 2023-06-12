import { Component } from '@angular/core';
import { InitSettings, Settings } from 'src/models/settings.model';
import { InitSettingService } from 'src/services/initsettings.service';
import { SettingService } from 'src/services/settings.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-user-options-screen',
  templateUrl: './user-options-screen.component.html',
})
export class UserOptionsScreenComponent {
  initSettings: InitSettings;
  settings: Settings;

  constructor(
    private initSettingService: InitSettingService,
    private settingService: SettingService,
    private authService: AuthService
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
    });
  }
}
