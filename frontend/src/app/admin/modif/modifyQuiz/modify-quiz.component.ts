import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
export class ModifyQuizAdminComponent implements OnChanges {
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
    console.log('admin modify quiz component');
    console.log(this.quiz);
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
    this.updateForm();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['quiz']) {
      this.updateForm();
    }
    if (changes['questions']) {
      this.questions = changes['questions'].currentValue;
    }
  }

  public updateQuiz() {
    if (this.quizForm.value.quizName != undefined) {
      this.quiz.name = this.quizForm.value.quizName;
    }
    if (this.quizForm.value.quizImage != undefined) {
      this.quiz.image = this.quizForm.value.quizImage;
    }
    if (this.quizForm.value.quizDifficulty != undefined) {
      this.quiz.difficulty = this.quizForm.value.quizDifficulty;
    }
    if (this.quizForm.value.quizDescription != undefined) {
      this.quiz.description = this.quizForm.value.quizDescription;
    }
    if (this.quizForm.value.quizEstimatedTime != undefined) {
      this.quiz.estimated_time = this.quizForm.value.quizEstimatedTime;
    }
    if (this.quizForm.value.quizTheme != undefined) {
      this.quiz.themeId = this.quizForm.value.quizTheme;
    }
  }

  public updateForm() {
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

  public addQuiz(): void {
    this.updateQuiz();
    this.uploadQuiz.emit(this.quiz);
  }

  modifyQuestion(question: Question) {
    this.quiz = {
      name: this.quizForm.value.quizName,
      image: this.quizForm.value.quizImage,
      difficulty: this.quizForm.value.quizDifficulty,
      description: this.quizForm.value.quizDescription,
      estimated_time: this.quizForm.value.quizEstimatedTime,
      themeId: this.quizForm.value.quizTheme,
    };
    this.loadQuiz.emit(this.quiz);
    this.loadModifyQuestion.emit(question);
    this.loadTabComponent.emit('QUESTION_MODIFY');
    this.deleteQuestion(question);
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
