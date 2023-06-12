import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable, forkJoin } from 'rxjs';
import { Notification } from '../models/notification.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationUrl = serverUrl + '/notifications';
  private httpOptions = httpOptionsBase;
  public notification: Notification = null;
  public notification$: BehaviorSubject<Notification> = new BehaviorSubject(
    this.notification
  );
  public notificationSelected$: Subject<Notification> = new Subject();

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  setCurrentUserNotification() {
    return new Promise((resolve, reject) => {
      if (this.notification !== undefined) {
        return resolve(true);
      }

      if (this.authService.user != null) {
        const uid = this.authService.user.id;

        const urlWithId = this.notificationUrl + '/user/' + uid;

        this.http.get<Notification>(urlWithId).subscribe((notification) => {
          this.notification = notification;
          this.notification$.next(this.notification);
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  }

  getNotificationsOfUser(uid: number): Observable<Notification[]> {
    const urlWithId = this.notificationUrl + '/user/' + uid;
    return this.http.get<Notification[]>(urlWithId);
  }

  getNotificationById(id: number): Observable<Notification> {
    const urlWithId = this.notificationUrl + '/' + id;
    return this.http.get<Notification>(urlWithId);
  }

  updateNotification(notification: Notification): Observable<Notification> {
    const urlWithId = this.notificationUrl + '/' + notification.id;
    return this.http.put<Notification>(
      urlWithId,
      notification,
      this.httpOptions
    );
  }

  setNotification(notification: Notification) {
    this.notification = notification;
    this.notification$.next(this.notification);
  }

  addNotification(notification: Notification): Observable<Notification> {
    console.log(notification);
    return this.http.post<Notification>(
      this.notificationUrl,
      notification,
      this.httpOptions
    );
  }
}
