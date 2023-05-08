import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Question, Theme, Quiz, Answer } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { ThemesService } from 'src/services/theme.service';
import { SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
})
export class QuizCreateComponent implements OnInit {
  @Input() questionsAnswers: Map<Question, Answer[]>;
  @Input() quizStored: Quiz;
  @Output() loadTabComponent = new EventEmitter<string>();
  @Output() loadQuiz = new EventEmitter<Quiz>();
  @Output() uploadQuiz = new EventEmitter<Quiz>();

  public quizForm: FormGroup;
  themes: Theme[] = [];
  quiz: Quiz;
  questions: Question[] = [];

  constructor(
    private quizService: QuizService,
    private formBuilder: FormBuilder,
    private router: Router,
    private themeService: ThemesService
  ) {
    this.quizForm = this.formBuilder.group({
      quizImage: ['', Validators.required],
      quizName: ['', [Validators.required]],
      quizDifficulty: ['', Validators.required],
      quizDescription: ['', Validators.required],
      quizEstimatedTime: ['', Validators.required],
      quizTheme: ['', Validators.required],
    });
    this.themeService.themes$.subscribe((themes) => {
      this.themes = themes;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('quizStored' in changes) {
      this.quiz = changes['quizStored'].currentValue;
      this.updateForm();
    }
    if ('questionsAnswers' in changes) {
      this.questionsAnswers = changes['questionsAnswers'].currentValue;
      this.questions = Array.from(this.questionsAnswers.keys());
    }
  }

  ngOnInit() {
    this.updateForm();
    this.quiz = this.quizStored;
    if (this.questionsAnswers) {
      this.questions = Array.from(this.questionsAnswers.keys());
    }
    console.log(this.quizStored);
  }

  updateForm() {
    if (this.quiz != undefined) {
      this.quizForm.patchValue({
        quizName: this.quiz.name,
        quizImage: this.quiz.image,
        quizDifficulty: this.quiz.difficulty,
        quizDescription: this.quiz.description,
        quizEstimatedTime: this.quiz.estimated_time,
        quizTheme: this.quiz.themeId,
      });
    }
  }

  public addQuestion(): void {
    this.quiz = {
      name: this.quizForm.value.quizName,
      image: this.quizForm.value.quizImage,
      difficulty: this.quizForm.value.quizDifficulty,
      description: this.quizForm.value.quizDescription,
      estimated_time: this.quizForm.value.quizEstimatedTime,
      themeId: this.quizForm.value.quizTheme,
    };
    this.loadQuiz.emit(this.quiz);
    this.loadTabComponent.emit('QUESTION_CREATE');
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
    this.uploadQuiz.emit(this.quiz);
  }
}
