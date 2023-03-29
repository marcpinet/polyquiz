import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {serverUrl, httpOptionsBase} from '../configs/server.config';
import {Theme} from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  public themes: Theme[]=[];
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);
  public themeSelected$: Subject<Theme> = new Subject();

  private themeUrl = serverUrl + '/themes';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveThemes();
  }

  retrieveThemes(): void {
    this.http.get<Theme[]>(this.themeUrl).subscribe({
      next: themeList => {
        this.themes = themeList;
        this.themes$.next(this.themes);
      },
      error: error => {
        console.error('Failed to retrieve themes', error);
      },
      complete: () => {
        console.log('Themes retrieval completed');
      }
    });
  }

  setSelectedTheme(themeId: string): void {
    const urlWithId = this.themeUrl + '/' + themeId;
    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      this.themeSelected$.next(theme);
    });
  }

}
