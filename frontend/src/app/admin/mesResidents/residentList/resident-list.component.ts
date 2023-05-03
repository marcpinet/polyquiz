import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Resident } from 'src/models/resident.model';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
@Component({
  selector: 'app-residents-list',
  templateUrl: './resident-list.component.html',
})
export class ResidentListComponent {
  public residentsList: Resident[] = [];
  public usersList: User[] = [];

  constructor(public router: Router, public userService: UserService) {
    this.userService.residents$.subscribe((residents) => {
      this.residentsList = residents;
      for (let resident of residents) {
        this.usersList.push(this.userService.getUserFromResident(resident));
      }
    });
  }

  navigateResidentStats(userId: number) {
    this.router.navigate(['/admin/stats-resident/', userId]);
  }
}
