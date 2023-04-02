import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable, forkJoin } from 'rxjs';
import { Settings } from '../models/settings.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private settingsUrl = serverUrl + '/settings';
  private httpOptions = httpOptionsBase;
  private settings: Settings[] = [];
  public settings$: BehaviorSubject<Settings[]> = new BehaviorSubject<Settings[]>(
    []
  );
  public settingsSelected$: Subject<Settings> = new Subject();
  public settingsId = 0;

  constructor(private http: HttpClient, private router: Router) {
    this.retrieveSettings();
  }

  retrieveSettings(): void {
    this.http.get<Settings[]>(this.settingsUrl).subscribe({
      next: (settingsList) => {
        this.settings = settingsList;
        this.settings$.next(this.settings);
      },
      error: (error) => {
        console.error('Failed to retrieve settings', error);
      },
      complete: () => {
        console.log('Settings retrieval completed');
      },
    });
  }

  setSelectedSetting(settingsId: string): void {
    const urlWithId = this.settingsUrl + '/' + settingsId;
    this.http.get<Settings>(urlWithId).subscribe((settings) => {
      this.settingsSelected$.next(settings);
    });
  }

  addSetting(settings: Settings): Observable<Settings> {
    this.settingsId++;
    return this.http.post<Settings>(this.settingsUrl, settings, this.httpOptions);
  }
}
