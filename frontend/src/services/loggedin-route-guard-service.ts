import { Injectable } from "@angular/core";
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { AuthService } from "./auth.service";
import { SettingService } from "./settings.service";

@Injectable({
  providedIn: 'root'
})

export class LoggedInRouteGuardService {
  constructor(private authService: AuthService, private router: Router, private settingService: SettingService) {}

  canActivate(): Promise<boolean> {
    return new Promise(((resolve, reject) => {
      if (this.authService.isLoggedIn()) {
        this.settingService.settings = undefined;
        this.settingService.settings$.next(undefined);
        this.settingService.settingsSelected$.next(undefined);
        console.log(this.settingService.settings);
        resolve(true);
      }
      else {
        this.authService.getLogin().then(() => {
          if (this.authService.isLoggedIn()) {
            resolve(false);
            this.router.navigate(['/']);
          }
          else {
            this.settingService.settings = undefined;
            this.settingService.settings$.next(undefined);
            this.settingService.settingsSelected$.next(undefined);
            console.log(this.settingService.settings);
            resolve(true);
          }
        });
      }
    }));
  }
}

