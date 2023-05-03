import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { Resident } from 'src/models/resident.model';
import { UserService } from 'src/services/user.service';
@Component({
  selector: 'app-mes-stats-residents',
  templateUrl: './stats-resident.component.html',
})
export class StatsResidentComponent {
  resident: Resident;
  user: User;
  constructor(
    public router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.resident = this.userService.getResidentById(parseInt(id));
    this.user = this.userService.getUserFromResident(this.resident);
  }
}
