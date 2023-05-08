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
  constructor(
    public router: Router,
    public quizService: QuizService,
    private http: HttpClient
  ) {
    this.quizService.quizzes$.subscribe((quizzes) => {
      this.quizList = quizzes;
      this.quizList.forEach((quiz) => {
        const quizId = quiz.id;
        this.getNumberOfParticipants(quizId).then((count) => {
          this.participantCounts[quizId] = count;
        });
      });
    });
  }

  navigateQuizModif(quizId: string) {
    this.router.navigate(['/admin/quiz/modif/' + quizId]);
  }

  async getNumberOfParticipants(quizId: string): Promise<number> {
    const res = new Set();
    try {
      const resultList = await this.http
        .get<Result[]>(serverUrl + '/results/quiz/' + quizId)
        .toPromise();
      resultList.forEach((result) => {
        res.add(result.user_id);
      });
      console.log(res);
      return res.size;
    } catch (error) {
      console.error('Failed to retrieve results', error);
      return 0;
    }
  }
}
