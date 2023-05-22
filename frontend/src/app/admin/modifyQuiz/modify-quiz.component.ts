import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  public quizForm: FormGroup;
  quiz: Quiz;
  constructor(
    public router: Router,
    public quizService: QuizService,
    public route: ActivatedRoute,
    private http: HttpClient,
    private formbuilder: FormBuilder
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    this.quizForm = this.formbuilder.group({
      quizImage: ['', Validators.required],
      quizName: ['', [Validators.required]],
      quizDifficulty: ['', Validators.required],
      quizDescription: ['', Validators.required],
      quizEstimatedTime: ['', Validators.required],
      quizTheme: ['', Validators.required],
    });
    this.quizService.retrieveQuizzes();
    this.quizService.getQuizById(id).subscribe((quiz) => {
      this.quiz = quiz;
      this.quizForm.patchValue({
        quizImage: this.quiz.image,
        quizName: this.quiz.name,
        quizDifficulty: this.quiz.difficulty,
        quizDescription: this.quiz.description,
        quizEstimatedTime: this.quiz.estimated_time,
        quizTheme: this.quiz.theme,
      });
    });
  }
}
