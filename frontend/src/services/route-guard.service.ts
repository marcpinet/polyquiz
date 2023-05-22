import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SettingService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private settingService: SettingService
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.authService.isLoggedIn()) {
        this.settingService.setCurrentUserSettings().then((v) => {
          if (v === true) {
            resolve(true);
            console.log(this.settingService.settings);
          } else {
            resolve(false);
          }
        });
      } else {
        this.authService.getLogin().then(() => {
          if (this.authService.isLoggedIn()) {
            this.settingService.setCurrentUserSettings().then((v) => {
              if (v === true) {
                if (this.authService.user.userType === 'admin') {
                  this.router.navigate(['/admin']);
                }
                resolve(true);
              } else {
                resolve(false);
              }
            });
          } else {
            resolve(false);
            this.router.navigate(['/login']);
          }
        });
      }
    });
  }
}
