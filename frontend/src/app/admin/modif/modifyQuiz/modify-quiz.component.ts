import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { serverUrl } from 'src/configs/server.config';
import { Answer, Question, Quiz, Theme } from 'src/models/quiz.model';
import { Result } from 'src/models/result-quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { ThemesService } from 'src/services/theme.service';
@Component({
  selector: 'app-modify-quiz-admin',
  templateUrl: './modify-quiz.component.html',
})
export class ModifyQuizAdminComponent {
  @Input() quiz: Quiz;
  @Input() questions: Map<Question, Answer[]>;
  @Output() loadModifyQuestion = new EventEmitter<Question>();
  @Output() deleteQuestionEmit = new EventEmitter<Question>();
  @Output() loadTabComponent = new EventEmitter<string>();
  @Output() uploadQuiz = new EventEmitter<Quiz>();
  @Output() loadQuiz = new EventEmitter<Quiz>();
  public quizForm: FormGroup;
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

    this.quizForm.patchValue({
      quizImage: this.quiz.image,
      quizName: this.quiz.name,
      quizDifficulty: this.quiz.difficulty,
      quizDescription: this.quiz.description,
      quizEstimatedTime: this.quiz.estimated_time,
      quizTheme: this.quiz.theme,
    });
  }

  public updateQuiz() {
    this.quiz.name = this.quizForm.value.quizName;
    this.quiz.image = this.quizForm.value.quizImage;
    this.quiz.difficulty = this.quizForm.value.quizDifficulty;
    this.quiz.description = this.quizForm.value.quizDescription;
    this.quiz.estimated_time = this.quizForm.value.quizEstimatedTime;
    this.quiz.themeId = this.quizForm.value.quizTheme;
  }

  public addQuiz(): void {
    this.updateQuiz();
    this.uploadQuiz.emit(this.quiz);
  }

  modifyQuestion(question: Question) {
    this.loadModifyQuestion.emit(question);
    this.loadTabComponent.emit('QUESTION_MODIFY');
  }

  public addQuestion(): void {
    this.updateQuiz();
    this.loadModifyQuestion.emit(null);
    this.loadTabComponent.emit('QUESTION_MODIFY');
  }

  public deleteQuestion(question: Question) {
    this.questions.delete(question);
    this.deleteQuestionEmit.emit(question);
  }
}
