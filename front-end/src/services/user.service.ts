import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { Resident } from '../models/resident.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = serverUrl + '/users';
  private residentUrl = serverUrl + '/residents';
  private httpOptions = httpOptionsBase;
  private users: User[] = [];
  private residents: Resident[] = [];
  public users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public residents$: BehaviorSubject<Resident[]> = new BehaviorSubject<Resident[]>([]);

  constructor(private http: HttpClient, private router: Router) {
    this.retrieveUsers();
    this.retrieveResidents();
  }

  retrieveUsers(): void {
    this.http.get<User[]>(this.userUrl).subscribe((userList) => {
      this.users = userList;
      this.users$.next(this.users);
    });
  }

  retrieveResidents(): void {
    this.http.get<Resident[]>(this.residentUrl).subscribe((residentList) => {
      this.residents = residentList;
      this.residents$.next(this.residents);
    });
  }

  addUser(user: User): void {
    this.http.post<User>(this.userUrl, user, this.httpOptions).subscribe(() => this.retrieveUsers());
  }

  addResident(resident: Resident): void {
    this.http.post<Resident>(this.residentUrl, resident, this.httpOptions).subscribe(() => this.retrieveResidents());
  }

  createResident(resident: Resident, user: User): void {
    this.addUser(user);
    this.addResident(resident);
  }
}
