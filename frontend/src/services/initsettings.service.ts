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
  public initsettings: InitSettings = null;
  public initsettings$: BehaviorSubject<InitSettings> = new BehaviorSubject(this.initsettings);
  public initsettingsSelected$: Subject<InitSettings> = new Subject();

  constructor(private http: HttpClient, private router: Router) {
  }

  setSelectedInitSetting(initsettingsId: string): void {
    const urlWithId = this.initsettingsUrl + '/' + initsettingsId;
    this.http.get<InitSettings>(urlWithId).subscribe((initsettings) => {
      this.initsettingsSelected$.next(initsettings);
    });
  }

}
