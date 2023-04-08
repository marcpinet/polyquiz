import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable, forkJoin } from 'rxjs';
import { InitSettings } from '../models/settings.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class InitSettingService {
  private initsettingsUrl = serverUrl + '/initsettings';
  private httpOptions = httpOptionsBase;
  private initsettings: InitSettings[] = [];
  public initsettings$: BehaviorSubject<InitSettings[]> = new BehaviorSubject<InitSettings[]>(
    []
  );
  public initsettingsSelected$: Subject<InitSettings> = new Subject();
  public initsettingsId = 0;

  constructor(private http: HttpClient, private router: Router) {
    this.retrieveInitSettings();
  }

  retrieveInitSettings(): void {
    this.http.get<InitSettings[]>(this.initsettingsUrl).subscribe({
      next: (initsettingsList) => {
        this.initsettings = initsettingsList;
        this.initsettings$.next(this.initsettings);
      },
      error: (error) => {
        console.error('Failed to retrieve initsettings', error);
      },
      complete: () => {
        console.log('InitSettings retrieval completed');
      },
    });
  }

  

  setSelectedInitSetting(initsettingsId: string): void {
    const urlWithId = this.initsettingsUrl + '/' + initsettingsId;
    this.http.get<InitSettings>(urlWithId).subscribe((initsettings) => {
      this.initsettingsSelected$.next(initsettings);
    });
  }

  addInitSetting(initsettings: InitSettings): Observable<InitSettings> {
    this.initsettingsId++;
    return this.http.post<InitSettings>(this.initsettingsUrl, initsettings, this.httpOptions);
  }
}
