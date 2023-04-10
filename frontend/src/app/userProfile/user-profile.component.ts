import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/user.model';
import { Resident } from 'src/models/resident.model';
import { UserService } from 'src/services/user.service';
@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  user: User;
  resident: Resident;
  constructor( private authService: AuthService, private userService: UserService) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.userService.residents$.subscribe((residents) => {
      this.resident = residents.find((resident) => resident.userId === this.user.id);
    });
  }

  ngOnInit() {}
}
