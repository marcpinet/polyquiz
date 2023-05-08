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
  public displayedUsers: User[] = [];
  public displayedResident: Resident[] = [];
  public inputValue: string = '';

  constructor(public router: Router, public userService: UserService) {
    this.userService.residents$.subscribe((residents) => {
      this.residentsList = residents;
      for (let resident of residents) {
        let user = this.userService.getUserFromResident(resident);
        if (user != undefined) {
          this.usersList.push(user);
        }
        this.displayedUsers = this.usersList;
      }
      this.displayedResident = residents;
    });
  }

  navigateResidentStats(userId: number) {
    this.router.navigate(['/admin/stats-resident/', userId]);
  }

  searchResident() {
    const filteredUsers = this.usersList.filter((user) => {
      if (user == undefined) return false;
      return (
        user.firstName.toLowerCase().includes(this.inputValue.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.inputValue.toLowerCase())
      );
    });
    const filteredResidents = this.residentsList.filter((resident) => {
      if (resident == undefined) return false;
      return resident.id.toString().includes(this.inputValue);
    });
    //TODO: pretty sure there is another way shorter lol
    this.displayedResident = [];
    this.displayedUsers = [];
    for (let resident of filteredResidents) {
      this.displayedUsers.push(
        this.usersList.filter((user) => user.id === resident.userId)[0]
      );
      this.displayedResident.push(resident);
    }
    for (let user of filteredUsers) {
      this.displayedResident.push(
        this.residentsList.filter((resident) => resident.userId === user.id)[0]
      );
      this.displayedUsers.push(user);
    }
  }
}
