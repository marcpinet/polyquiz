import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resident } from 'src/models/resident.model';
import { UserService } from 'src/services/user.service';
@Component({
  selector: 'app-residents-list',
  templateUrl: './resident-list.component.html',
})
export class ResidentListComponent implements OnInit {
  public residentsList: Resident[] = [];

  constructor(public router: Router, public userService: UserService) {
    this.userService.residents$.subscribe((residents) => {
      this.residentsList = residents;
    });
  }

  ngOnInit() {}
}
