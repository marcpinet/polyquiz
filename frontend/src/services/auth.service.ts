import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/models/user.model';
import { httpOptionsBase, serverUrl } from '../configs/server.config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
//TODO: Login redirects based on resident or admin
export class AuthService {
  private authUrl = serverUrl + '/users';
  private loginPath = 'login';
  private logoutPath = 'logout';
  private httpOptions = httpOptionsBase;

  public user: User = null;
  public user$: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn(): boolean {
    return this.user !== null && this.user.hasOwnProperty('id');
  }

  login(user: User) {
    return new Promise((resolve, reject) => {
      this.http
        .post<User>(this.authUrl + '/' + this.loginPath, user, httpOptionsBase)
        .subscribe((user) => {
          this.user = user;
          this.user$.next(this.user);
          if (this.isLoggedIn()) {
            if (user.userType === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/']);
            }
            resolve('');
          } else {
            resolve('Erreur : ' + JSON.parse(JSON.stringify(user)).errors);
          }
        });
    });
  }

  getLogin() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.authUrl + '/' + this.loginPath, httpOptionsBase)
        .subscribe((user) => {
          this.user = user as User;
          this.user$.next(this.user);
          if (this.isLoggedIn()) {
            resolve('');
          } else {
            resolve('');
          }
        });
    });
  }

  logout() {
    this.http
      .get(this.authUrl + '/' + this.logoutPath, httpOptionsBase)
      .subscribe(() => {
        this.user = null;
        this.user$.next(this.user);
        this.router.navigate(['/login']);
      });
  }
}
