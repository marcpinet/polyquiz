import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable, forkJoin } from 'rxjs';
import { Settings } from '../models/settings.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private settingsUrl = serverUrl + '/settings';
  private httpOptions = httpOptionsBase;
  public settings: Settings = null;
  public settings$: BehaviorSubject<Settings> = new BehaviorSubject(
    this.settings
  );
  public settingsSelected$: Subject<Settings> = new Subject();

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  setCurrentUserSettings() {
    return new Promise((resolve, reject) => {
      if (this.settings !== undefined) {
        return resolve(true);
      }

      if (this.authService.user != null) {
        const uid = this.authService.user.id;

        const urlWithId = this.settingsUrl + '/' + uid;

        this.http.get<Settings>(urlWithId).subscribe((settings) => {
          this.settings = settings;
          this.settings$.next(this.settings);
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  }

  getSettingsOfUser(uid: number): Observable<Settings> {
    const urlWithId = this.settingsUrl + '/' + uid;
    return this.http.get<Settings>(urlWithId);
  }

  updateSettings(settings: Settings): Observable<Settings> {
    const urlWithId = this.settingsUrl + '/' + settings.user_id;
    return this.http.put<Settings>(urlWithId, settings, this.httpOptions);
  }

  setSettings(settings: Settings) {
    this.settings = settings;
    this.settings$.next(this.settings);
  }
}
