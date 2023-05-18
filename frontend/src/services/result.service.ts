import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable, forkJoin } from 'rxjs';
import { Result } from '../models/result-quiz.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private resultUrl = serverUrl + '/results';
  private httpOptions = httpOptionsBase;
  private results: Result[] = [];
  public results$: BehaviorSubject<Result[]> = new BehaviorSubject<Result[]>(
    []
  );
  public resultSelected$: Subject<Result> = new Subject();

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
    return this.http.post<Result>(this.resultUrl, result, this.httpOptions);
  }

  getResultsByUser(user: User): Observable<Result[]> {
    const urlWithId = this.resultUrl + '/user/' + user.id;
    return this.http.get<Result[]>(urlWithId);
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
