import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable, forkJoin } from 'rxjs';
import { User } from '../models/user.model';
import { Resident } from '../models/resident.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = serverUrl + '/users';
  private residentUrl = serverUrl + '/residents';
  private httpOptions = httpOptionsBase;
  private users: User[] = [];
  private residents: Resident[] = [];
  public users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public residents$: BehaviorSubject<Resident[]> = new BehaviorSubject<
    Resident[]
  >([]);

  constructor(private http: HttpClient, private router: Router) {
    //TODO: Simplify later to only get one necessary user and not the whole list :v
    this.retrieveUsers();
    this.retrieveResidents();
  }

  retrieveUsers(): void {
    this.http.get<User[]>(this.userUrl).subscribe({
      next: (userList) => {
        this.users = userList;
        this.users$.next(this.users);
      },
      error: (error) => {
        console.error('Failed to retrieve users', error);
      },
      complete: () => {
        console.log('User retrieval completed');
      },
    });
  }

  retrieveResidents(): void {
    this.http.get<Resident[]>(this.residentUrl).subscribe({
      next: (residentList) => {
        this.residents = residentList;
        this.residents$.next(this.residents);
      },
      error: (error) => {
        console.error('Failed to retrieve residents', error);
      },
      complete: () => {
        console.log('Resident retrieval completed');
      },
    });
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions);
  }

  addResident(resident: Resident): Observable<Resident> {
    return this.http.post<Resident>(
      this.residentUrl,
      resident,
      this.httpOptions
    );
  }

  getUserFromResident(resident: Resident): User {
    console.log(resident);
    return this.users.find((user) => user.id == resident.userId);
  }

  createResident(resident: Resident, user: User): void {
    forkJoin([this.addUser(user), this.addResident(resident)]).subscribe({
      next: ([addedUser, addedResident]) => {
        console.log('Both user and resident were added successfully');
        this.users.push(addedUser);
        this.users$.next(this.users);
        this.residents.push(addedResident);
        this.residents$.next(this.residents);

        // Update the resident's userId to the id of the added user
        addedResident.userId = addedUser.id;

        // Update the resident on the server with the new userId
        this.http
          .put<Resident>(
            `${this.residentUrl}/${addedResident.id}`,
            addedResident,
            this.httpOptions
          )
          .subscribe({
            next: () => {
              console.log('Resident was updated with new userId');
              Swal.fire({
                title: 'Succès',
                text: 'Resident a été ajouté avec succès',
                icon: 'success',
                confirmButtonText: 'Ok',
              }).then(() => {
                this.router.navigate(['/admin']);
              });
            },
            error: (error) => {
              console.error('Failed to update resident with new userId', error);
            },
            complete: () => {
              console.log('Resident update completed');
            },
          });
      },
      error: (error) => {
        console.error('Failed to create resident and user', error);
      },
      complete: () => {
        console.log('Resident and user creation completed');
      },
    });
  }

  getPhotoUrl(user: User) {
    if (user.avatar == undefined) {
      return 'assets/user.png'; //TODO: path works?
    } else return user.avatar;
  }

  getResidentById(id: number): Resident {
    return this.residents.find((resident) => resident.id == id);
  }

  userExists(name: string): boolean {
    return this.users.find((user) => user.userName == name) != undefined;
  }

  getUserById(id: number): User {
    return this.users.find((user) => user.id == id);
  }

  updatePassword(
    userId: number,
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http.put(
      `${this.userUrl}/${userId}/password`,
      { oldPassword, newPassword },
      this.httpOptions
    );
  }
}
