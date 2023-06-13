import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/user.model';
import Swal from 'sweetalert2';
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
    if (this.user.userType == 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/']);
    }
  }

  navigateProfile() {
    this.router.navigate(['/profile']);
  }

  navigateSettings() {
    let dialog = document.getElementsByTagName('dialog')[1];
    dialog.showModal();
  }

  // navigateHelp() {
  //   this.router.navigate(['/help']);
  // }

  helpPopup() {
    let dialog = document.getElementsByTagName('dialog')[0];
    dialog.showModal();
  }
}
