import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject,  Observable, forkJoin } from 'rxjs';
import { Result } from '../models/result-quiz.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private resultUrl = serverUrl + '/results';
  private httpOptions = httpOptionsBase;
  private results: Result[] = [];
  public results$: BehaviorSubject<Result[]> = new BehaviorSubject<Result[]>([]);

  constructor(private http: HttpClient, private router: Router) {
    this.retrieveResults();
  }

  retrieveResults(): void {
    this.http.get<Result[]>(this.resultUrl).subscribe({
      next: resultList => {
        this.results = resultList;
        this.results$.next(this.results);
      },
      error: error => {
        console.error('Failed to retrieve results', error);
      },
      complete: () => {
        console.log('Result retrieval completed');
      }
    });
  }

  addResult(result: Result): Observable<Result> {
    return this.http.post<Result>(this.resultUrl, result, this.httpOptions);
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
