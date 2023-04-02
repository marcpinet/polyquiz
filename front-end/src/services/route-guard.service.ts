import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { AuthService } from './auth.service';
import { SettingService } from './settings.service';

@Injectable({
  providedIn: 'root'
})

export class RouteGuardService {

    constructor(private router: Router, private authService: AuthService, private settingService: SettingService) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise((resolve, reject) => {
        if (this.authService.isLoggedIn()) {
          this.settingService.setCurrentUserSettings().then((v) => {
            if (v === true) {
              resolve(true);
              console.log(this.settingService.settings);
            } else {
              resolve(false);
            }
          });
          resolve(true);
        }
        else {
          this.authService.getLogin().then(() => {
            if (this.authService.isLoggedIn()) {
              this.settingService.setCurrentUserSettings().then((v) => {
                if (v === true) {
                  resolve(true);
                  console.log(this.settingService.settings);
                } else {
                  resolve(false);
                }
              });
              resolve(true);
            } else {
              resolve(false);
              this.router.navigate(["/login"]);
            }
          });
        }
      });
    }
}
