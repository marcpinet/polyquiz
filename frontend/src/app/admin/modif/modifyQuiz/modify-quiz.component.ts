import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { serverUrl } from 'src/configs/server.config';
import { Quiz, Theme } from 'src/models/quiz.model';
import { Result } from 'src/models/result-quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { ThemesService } from 'src/services/theme.service';
@Component({
  selector: 'app-modify-quiz-admin',
  templateUrl: './modify-quiz.component.html',
})
export class ModifyQuizAdminComponent {
  public quizForm: FormGroup;
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

  public deleteQuestion(questionid: number) {
    this.quiz.questions.splice(questionid, 1);
  }

  public addQuiz(): void {
    this.quiz = {
      name: this.quizForm.value.quizName,
      image: this.quizForm.value.quizImage,
      difficulty: this.quizForm.value.quizDifficulty,
      description: this.quizForm.value.quizDescription,
      estimated_time: this.quizForm.value.quizEstimatedTime,
      themeId: this.quizForm.value.quizTheme,
    };

    const questions = new Map();
    this.quiz.questions.forEach((question) => {
      questions.set(question, question.answers);
    });
    this.quizService.deleteQuiz(this.quiz);
    this.quizService.createQuiz(this.quiz, questions);
  }

  public addQuestion(): void {}
}
