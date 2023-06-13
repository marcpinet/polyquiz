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
}
