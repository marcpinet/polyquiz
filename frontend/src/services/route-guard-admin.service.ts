import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SettingService } from './settings.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class RouteGuardAdminService implements CanActivate {
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
            if (this.authService.user.userType === 'admin') {
              resolve(true);
              console.log(this.settingService.settings);
            } else {
              resolve(false);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Vous n'avez pas les droits pour accéder à cette page",
              });
              this.router.navigate(['/login']);
            }
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
                  resolve(true);
                  console.log(this.settingService.settings);
                } else {
                  resolve(false);
                  this.router.navigate(['/login']);
                }
              } else {
                resolve(false);
              }
            });
          } else {
            resolve(false);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Vous n'avez pas les droits pour accéder à cette page",
            });
            this.router.navigate(['/login']);
          }
        });
      }
    });
  }
}
