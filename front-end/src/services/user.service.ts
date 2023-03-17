import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Router} from '@angular/router'; //to be able to navigate when log in, log out later

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = serverUrl + '/users';
  private httpOptions = httpOptionsBase;
  private DEFAULT_AVATAR = "../../assets/images/defaultAvatar.png";
  constructor(private http: HttpClient,
    private router: Router) {
  }
  createResidentAccount(userName: string, firstName: string, lastName: string, password: string, residentNum: string, genre: string, symptome : [], dateOfBirth: Date, avatar?: string) {
    return new Promise(
      ((resolve, reject) => {
        const residentToCreate = {
          userName,
          firstName,
          lastName,
          password,
          residentNum,
          genre,
          symptome,
          dateOfBirth,
          avatar: this.DEFAULT_AVATAR
        };
        this.http.post<User>(this.userUrl + '/', residentToCreate, httpOptionsBase).subscribe((u) => {
          const error = JSON.parse(JSON.stringify(u)).errors;
          if (error === '') {
            resolve('');
          }
          resolve('Erreur : ' + error);
        });
      }));
  }
}
