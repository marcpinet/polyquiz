import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { Question } from '../models/quiz.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { User } from 'src/models/user.model';
@Injectable({
  providedIn: 'root',
})
export class QuizService {
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /*
   The list of quiz.
   The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = [];

  /*
   Observable which contains the list of the quiz.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  public quizSelected$: Subject<Quiz> = new Subject();

  private quizUrl = serverUrl + '/quizzes';
  private questionsPath = 'questions';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveQuizzes();
  }

  retrieveQuizzes(): void {
    this.http.get<Quiz[]>(this.quizUrl).subscribe({
      next: (quizList) => {
        this.quizzes = quizList;
        this.quizzes$.next(this.quizzes);
      },
      error: (error) => {
        console.error('Failed to retrieve quizzes', error);
      },
      complete: () => {
        console.log('Quizzes retrieval completed');
      },
    });
  }

  addQuiz(quiz: Quiz): void {
    this.http
      .post<Quiz>(this.quizUrl, quiz, this.httpOptions)
      .subscribe(() => this.retrieveQuizzes());
  }

  setSelectedQuiz(quizId: string): void {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }

  deleteQuiz(quiz: Quiz): void {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http
      .delete<Quiz>(urlWithId, this.httpOptions)
      .subscribe(() => this.retrieveQuizzes());
  }

  addQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http
      .post<Question>(questionUrl, question, this.httpOptions)
      .subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: Quiz, question: Question): void {
    const questionUrl =
      this.quizUrl +
      '/' +
      quiz.id +
      '/' +
      this.questionsPath +
      '/' +
      question.id;
    this.http
      .delete<Question>(questionUrl, this.httpOptions)
      .subscribe(() => this.setSelectedQuiz(quiz.id));
  }
}
