import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, forkJoin, of, Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { Question } from '../models/quiz.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Answer } from '../models/quiz.model';
import { switchMap, map, tap, mapTo } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LeaveRouteGuard } from './leave-route-guard';
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
  private answerPath = 'answers';

  private httpOptions = httpOptionsBase;

  constructor(
    private http: HttpClient,
    private router: Router,
    private leaveRouteGuard: LeaveRouteGuard
  ) {
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

  getQuizById(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    return this.http.get<Quiz>(urlWithId);
  }

  addQuestion(quizId: string, question: Question): Observable<Question> {
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}`;
    return this.http.post<Question>(url, question, this.httpOptions);
  }

  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions);
  }

  createQuiz(quiz: Quiz, questionAnswers: Map<Question, Answer[]>) {
    this.leaveRouteGuard.disableGuard();
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe({
      next: (createdQuiz) => {
        console.log('Quiz was created successfully');
        this.quizzes.push(createdQuiz);
        this.quizzes$.next(this.quizzes);
        let requestsCompleted = 0;
        questionAnswers.forEach((answers: Answer[], question: Question) => {
          question.quizId = parseInt(createdQuiz.id);
          this.http
            .post<Question>(
              `${this.quizUrl}/${createdQuiz.id}/${this.questionsPath}`,
              question,
              this.httpOptions
            )
            .subscribe({
              next: (createdQuestion) => {
                console.log('Question was created successfully');
                question.id = createdQuestion.id;
                answers.forEach((answer: Answer) => {
                  this.http
                    .post<Answer>(
                      `${this.quizUrl}/${createdQuiz.id}/${this.questionsPath}/${createdQuestion.id}/${this.answerPath}`,
                      answer,
                      this.httpOptions
                    )
                    .subscribe({
                      next: (createdAnswer) => {
                        console.log('Answer was created successfully');
                        requestsCompleted++;
                        if (
                          requestsCompleted ===
                          questionAnswers.size * answers.length
                        ) {
                          Swal.fire({
                            title: 'Quiz créé',
                            text: 'Vous allez être redirigé vers la liste des quiz',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false,
                          })
                            .then(() => {
                              this.router.navigate(['/admin/quiz']);
                            })
                            .then(() => {
                              this.router.navigate(['/admin']).then(() => {
                                this.leaveRouteGuard.enableGuard();
                              });
                            });
                        }
                      },
                      error: (error) => {
                        console.error('Failed to create answer', error);
                        Swal.fire({
                          title: 'Erreur',
                          text: 'Une erreur est survenue lors de la création de la réponse',
                          icon: 'error',
                          timer: 2000,
                          showConfirmButton: false,
                        });
                      },
                    });
                });
              },
              error: (error) => {
                console.error('Failed to create question', error);
                Swal.fire({
                  title: 'Erreur',
                  text: 'Une erreur est survenue lors de la création de la question',
                  icon: 'error',
                  timer: 2000,
                  showConfirmButton: false,
                });
              },
            });
        });
      },
      error: (error) => {
        console.error('Failed to create quiz', error);
        Swal.fire({
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la création du quiz',
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
        });
      },
    });
  }

  createQuestion(quizId: string, question: Question): Observable<Question> {
    return this.http.post<Question>(
      `${this.quizUrl}/${quizId}/${this.questionsPath}`,
      question,
      this.httpOptions
    );
  }

  createAnswer(
    quizId: string,
    questionId: string,
    answer: Answer
  ): Observable<Answer> {
    return this.http.post<Answer>(
      `${this.quizUrl}/${quizId}/${this.questionsPath}/${questionId}/${this.answerPath}`,
      answer,
      this.httpOptions
    );
  }
}
