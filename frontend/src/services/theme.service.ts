import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Theme } from '../models/quiz.model';
import { QuizService } from './quiz.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  public themes: Theme[] = [];
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);
  public themeSelected$: Subject<Theme> = new Subject();

  private themeUrl = serverUrl + '/themes';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private quizService: QuizService) {
    this.retrieveThemes();
  }

  retrieveThemes(): void {
    this.http.get<Theme[]>(this.themeUrl).subscribe({
      next: (themeList) => {
        this.themes = themeList;
        this.themes$.next(this.themes);
      },
      error: (error) => {
        console.error('Failed to retrieve themes', error);
      },
      complete: () => {
        console.log('Themes retrieval completed');
      },
    });
  }

  setSelectedTheme(themeId: string): void {
    const urlWithId = this.themeUrl + '/' + themeId;
    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      this.themeSelected$.next(theme);
    });
  }

  addTheme(theme: Theme): Observable<Theme> {
    const themeUpdated = this.http.post<Theme>(
      this.themeUrl,
      theme,
      this.httpOptions
    );
    themeUpdated.subscribe({
      next: () => {
        this.retrieveThemes();
      },
    });
    return themeUpdated;
  }

  updateTheme(theme: Theme): Observable<Theme> {
    const urlWithId = this.themeUrl + '/' + theme.id;
    return this.http.put<Theme>(urlWithId, theme, this.httpOptions);
  }

  deleteTheme(theme: Theme): void {
    //verifier si le theme est utilisé par un quiz
    this.quizService.quizzes$.subscribe((quizzes) => {
      let isUsed = false;
      quizzes.forEach((quiz) => {
        if (quiz.themeId === parseInt(theme.id)) {
          isUsed = true;
        }
      });
      if (isUsed) {
        Swal.fire({
          title: 'Ce thème est utilisé par un quiz',
          text: 'Veuillez supprimer le quiz avant de supprimer le thème',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      } else {
        const urlWithId = this.themeUrl + '/' + theme.id;
        this.http.delete<Theme>(urlWithId, this.httpOptions).subscribe({
          next: () => {
            this.retrieveThemes();
          },
          error: (error) => {
            Swal.fire({
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la suppression du thème',
              icon: 'error',
              timer: 2000,
              showConfirmButton: false,
            });
          },
          complete: () => {
            Swal.fire({
              title: 'Thème supprimé',
              text: 'Le thème a bien été supprimé',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
          },
        });
      }
    });
  }
}
