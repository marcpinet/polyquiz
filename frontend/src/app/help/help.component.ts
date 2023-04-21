import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/user.model';
@Component({
  selector: 'app-mes-resultats',
  templateUrl: './help.component.html',
})
export class HelpComponent implements OnInit {
  user: User;
  constructor(private authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {}
}
