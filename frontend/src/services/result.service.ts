import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Result } from '../models/result-quiz.model';
import { httpOptionsBase, serverUrl } from '../configs/server.config';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  public results$: BehaviorSubject<Result[]> = new BehaviorSubject<Result[]>(
    []
  );
  public resultSelected$: Subject<Result> = new Subject();
  public resultId = 0;
  private resultUrl = serverUrl + '/results';
  private httpOptions = httpOptionsBase;
  private results: Result[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.retrieveResults();
  }

  retrieveResults(): void {
    this.http.get<Result[]>(this.resultUrl).subscribe({
      next: (resultList) => {
        this.results = resultList;
        this.results$.next(this.results);
      },
      error: (error) => {
        console.error('Failed to retrieve results', error);
      },
      complete: () => {
        console.log('Result retrieval completed');
      },
    });
  }

  setSelectedResult(resultId: string): void {
    const urlWithId = this.resultUrl + '/' + resultId;
    this.http.get<Result>(urlWithId).subscribe((result) => {
      this.resultSelected$.next(result);
    });
  }

  addResult(result: Result): Observable<Result> {
    this.resultId++;
    return this.http.post<Result>(this.resultUrl, result, this.httpOptions);
  }

  getResultsByUser(user: User): Observable<Result[]> {
    const urlWithId = this.resultUrl + '/user/' + user.id;
    return this.http.get<Result[]>(urlWithId);
  }

  getUserQuizStatus(
    userId: number,
    quizId: string
  ): Observable<'done' | 'in_progress' | 'not_done'> {
    return this.http.get<Result[]>(this.resultUrl).pipe(
      map((results) => {
        const userResults = results.filter(
          (result) => result.user_id === userId && result.quiz_id === quizId
        );
        if (userResults.length === 0) {
          return 'not_done';
        }
        const inProgressResult = userResults.find(
          (result) => result.status === 'in_progress'
        );
        return inProgressResult ? 'in_progress' : 'done';
      })
    );
  }

  // createResult(result: Result): void {
  //   forkJoin([
  //     this.addResult(result),
  //   ]).subscribe({
  //     next: ([addedResult]) => {
  //       console.log('Both result and resident were added successfully');
  //       this.results.push(addedResult);
  //       this.results$.next(this.results);
  //     },
  //     error: error => {
  //       console.error('Failed to create resident', error);
  //     },
  //     complete: () => {
  //       console.log('Resident creation completed');
  //     }
  //   });
  // }
}
