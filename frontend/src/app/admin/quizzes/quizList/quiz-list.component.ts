import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { serverUrl } from 'src/configs/server.config';
import { Quiz } from 'src/models/quiz.model';
import { Result } from 'src/models/result-quiz.model';
import { QuizService } from 'src/services/quiz.service';
@Component({
  selector: 'app-quiz-list-admin',
  templateUrl: './quiz-list.component.html',
})
export class QuizListAdminComponent {
  public quizList: Quiz[] = [];
  participantCounts: { [quizId: string]: number } = {};
  totalTries: { [quizId: string]: number } = {};
  totalWinrate: { [quizId: string]: number } = {};
  constructor(
    public router: Router,
    public quizService: QuizService,
    private http: HttpClient
  ) {
    this.quizService.quizzes$.subscribe((quizzes) => {
      this.quizList = quizzes;
      this.quizList.forEach((quiz) => {
        const quizId = quiz.id;
        this.getResultsForQuiz(quizId).then((resultList) => {
          var participants = new Set();
          var winrate = 0;
          resultList.forEach((result) => {
            participants.add(result.user_id);
            winrate +=
              result.right_answers /
              (result.right_answers + result.wrong_answers);
          });
          this.participantCounts[quizId] = participants.size;
          if (resultList.length > 0) {
            this.totalWinrate[quizId] = Math.round(
              (winrate / resultList.length) * 100
            );
          } else {
            this.totalWinrate[quizId] = 0;
          }

          this.totalTries[quizId] = resultList.length;
        });
      });
    });
  }

  async getResultsForQuiz(quizId: string): Promise<Result[]> {
    try {
      const resultList = await this.http
        .get<Result[]>(serverUrl + '/results/quiz/' + quizId)
        .toPromise();
      return resultList;
    } catch (error) {
      console.error('Failed to retrieve results', error);
      return [];
    }
  }

  modifQuiz(quizId: string) {
    console.log('modif quiz ' + quizId);
    const quiz = this.quizList.find((quiz) => quiz.id === quizId);
    console.log(quiz);
    this.router.navigate(['/admin/quiz/add'], { queryParams: { quizId } });
  }
}
