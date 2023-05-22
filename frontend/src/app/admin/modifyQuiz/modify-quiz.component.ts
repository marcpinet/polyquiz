import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { serverUrl } from 'src/configs/server.config';
import { Quiz } from 'src/models/quiz.model';
import { Result } from 'src/models/result-quiz.model';
import { QuizService } from 'src/services/quiz.service';
@Component({
  selector: 'app-modify-quiz-admin',
  templateUrl: './modify-quiz.component.html',
  styleUrls: ['./modify-quiz.component.scss'],
})
export class ModifyQuizAdminComponent {
  quiz: Quiz;
  constructor(
    public router: Router,
    public quizService: QuizService,
    private http: HttpClient
  ) {
    //recover the quizId from the url
    const url = this.router.url;
    const quizId = url.split('/')[3];
    //Recover quiz from quizSerice
    this.quizService.quizzes$.subscribe((quizzes) => {
      this.quiz = quizzes.find((quiz) => quiz.id === quizId);
    });
  }
}
