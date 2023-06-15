import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'admin-profile',
  templateUrl: './admin-profile.component.html',
})
export class AdminProfileComponent {
  user: User;
  modals = [
    {
      num: 1,
      title: 'Changer le mot de passe',
    },
    {
      num: 2,
      title: 'Modifier le profil',
    },
  ];

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
  }

  passwordPopUp() {
    let dialog = document.getElementsByTagName('dialog')[this.modals[0].num];
    dialog.showModal();
  }

  profileUpdatePopUp() {
    let dialog = document.getElementsByTagName('dialog')[this.modals[1].num];
    dialog.showModal();
  }
}
