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

  private _currentPage: number = 1;
  public itemsPerPage: number = 4;

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
      this.searchResident();
    });
  }

  public get currentPage(): number {
    return this._currentPage;
  }

  public set currentPage(value: number) {
    this._currentPage = value;
    this.searchResident();
  }

  public get totalPages(): number {
    return Math.ceil(this.residentsList.length / this.itemsPerPage);
  }

  navigateResidentStats(userId: number) {
    this.router.navigate(['/admin/stats-resident/', userId]);
  }

  searchResident() {
    if (this.inputValue == '') {
      this.displayedResident = this.residentsList;
      this.displayedUsers = this.usersList;
    } else {
      const filteredUsers = this.usersList.filter((user) => {
        if (user == undefined) return false;
        return (
          user.firstName
            .toLowerCase()
            .includes(this.inputValue.toLowerCase()) ||
          user.lastName.toLowerCase().includes(this.inputValue.toLowerCase()) ||
          user.userName.toLowerCase().includes(this.inputValue.toLowerCase())
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
          this.residentsList.filter(
            (resident) => resident.userId === user.id
          )[0]
        );
        this.displayedUsers.push(user);
      }
    }

    this.displayedResident = this.displayedResident.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );

    this.displayedUsers = this.displayedUsers.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }
}
