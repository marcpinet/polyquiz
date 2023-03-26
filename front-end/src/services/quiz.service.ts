import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject,  Observable, forkJoin } from 'rxjs';
import { Quiz, Question, Answer, Theme } from '../models/quiz.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizUrl = serverUrl + '/quizzes';
  private questionUrl = serverUrl + '/questions';
  private answerUrl = serverUrl + '/answers';
  private themeUrl = serverUrl + '/themes';
  private httpOptions = httpOptionsBase;
  private quizzes: Quiz[] = [];
  private questions: Question[] = [];
  private answers: Answer[] = [];
  private themes: Theme[] = [];
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>([]);
  public questions$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
  public answers$: BehaviorSubject<Answer[]> = new BehaviorSubject<Answer[]>([]);
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject<Theme[]>([]);

  constructor(private http: HttpClient, private router: Router) {
    this.retrieveQuizzes();
    this.retrieveQuestions();
    this.retrieveAnswers();
    this.retrieveThemes();
  }

  retrieveQuizzes(): void {
    this.http.get<Quiz[]>(this.quizUrl).subscribe({
      next: quizList => {
        this.quizzes = quizList;
        this.quizzes$.next(this.quizzes);
      },
      error: error => {
        console.error('Failed to retrieve quizzes', error);
      },
      complete: () => {
        console.log('User retrieval completed');
      }
    });
  }

  retrieveQuestions(): void {
    this.http.get<Question[]>(this.questionUrl).subscribe({
      next: questionList => {
        this.questions = questionList;
        this.questions$.next(this.questions);
      },
      error: error => {
        console.error('Failed to retrieve questions', error);
      },
      complete: () => {
        console.log('Question retrieval completed');
      }
    });
  }

  retrieveAnswers(): void {
    this.http.get<Answer[]>(this.answerUrl).subscribe({
      next: answerList => {
        this.answers = answerList;
        this.answers$.next(this.answers);
      },
      error: error => {
        console.error('Failed to retrieve answers', error);
      },
      complete: () => {
        console.log('Answer retrieval completed');
      }
    });
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
        console.log('Theme retrieval completed');
      }
    });
  }

  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.themeUrl);
  }

  getThemeById(id: number): Observable<Theme> {
    return this.http.get<Theme>(`${this.themeUrl}/${id}`);
  }
}
