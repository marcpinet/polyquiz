import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Resident } from 'src/models/resident.model';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
@Component({
  selector: 'app-residents-list-tr',
  templateUrl: './resident-list-tr.component.html',
})
export class ResidentListTrComponent {
  @Input() resident: Resident;
  @Input() user: User;

  constructor(private router: Router, public userService: UserService) {}

  onClick() {
    console.log(this.resident.id + 'clicked');
  }
}
