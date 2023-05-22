import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { serverUrl } from 'src/configs/server.config';
import { Question, Quiz, Theme } from 'src/models/quiz.model';
import { Result } from 'src/models/result-quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { ThemesService } from 'src/services/theme.service';
@Component({
  selector: 'app-modify-question-admin',
  templateUrl: './modify-question.component.html',
})
export class ModifyQuestionAdminComponent {
  @Input() question: Question;

  public questionForm: FormGroup;
  quiz: Quiz;
  themes: Theme[] = [];
  constructor(
    public router: Router,
    public quizService: QuizService,
    public route: ActivatedRoute,
    private http: HttpClient,
    private formbuilder: FormBuilder,
    private themeService: ThemesService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.themeService.themes$.subscribe((themes) => {
      this.themes = themes;
    });
    this.questionForm = this.formbuilder.group({
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
      this.questionForm.patchValue({
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
