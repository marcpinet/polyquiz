import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/user.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user: User;
  constructor(private router: Router, private authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {}

  navigateMain() {
    this.router.navigate(['/']);
  }

  navigateProfile() {
    this.router.navigate(['/profile']);
  }
}
