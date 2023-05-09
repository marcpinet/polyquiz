import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resident } from 'src/models/resident.model';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-modif-resident',
  templateUrl: './modif-resident.component.html',
})
export class ModifResidentComponent {
  public resident: Resident;
  public user: User;

  constructor(
    public router: Router,
    public userService: UserService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.resident = this.userService.getResidentById(parseInt(id));
    this.user = this.userService.getUserFromResident(this.resident);
  }
}
