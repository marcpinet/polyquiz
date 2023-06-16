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
export class ModifyQuizAdminComponent implements OnInit {
  @Input() quiz: Quiz;
  @Input() questions: Map<Question, Answer[]>;
  @Output() loadModifyQuestion = new EventEmitter<Question>();
  @Output() deleteQuestionEmit = new EventEmitter<Question>();
  @Output() loadTabComponent = new EventEmitter<string>();
  @Output() uploadQuiz = new EventEmitter<Quiz>();
  @Output() loadQuiz = new EventEmitter<Quiz>();
  public quizForm: FormGroup;
  themes: Theme[] = [];
  questionsArray: Question[] = [];
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

  ngOnInit(): void {
    this.updateForm();
  }

  public updateQuiz() {
    console.log('update quiz');
    console.log(this.questions);
    this.quiz.name = this.quizForm.value.quizName;
    this.quiz.image = this.quizForm.value.quizImage;
    this.quiz.difficulty = this.quizForm.value.quizDifficulty;
    this.quiz.description = this.quizForm.value.quizDescription;
    this.quiz.estimated_time = this.quizForm.value.quizEstimatedTime;
    this.quiz.themeId = this.quizForm.value.quizTheme;
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
    if (this.questions != undefined)
      this.questionsArray = Array.from(this.questions.keys());
  }

  public addQuiz(): void {
    this.updateQuiz();
    this.uploadQuiz.emit(this.quiz);
  }

  modifyQuestion(questionId: number) {
    this.updateQuiz();
    this.loadQuiz.emit(this.quiz);
    this.loadModifyQuestion.emit(this.questionsArray[questionId]);
    this.loadTabComponent.emit('QUESTION_MODIFY');
    this.deleteQuestion(this.questionsArray[questionId]);
  }

  public addQuestion(): void {
    this.updateQuiz();
    this.loadModifyQuestion.emit(null);
    this.loadTabComponent.emit('QUESTION_MODIFY');
  }

  public deleteQuestion(question: Question) {
    this.deleteQuestionEmit.emit(question);
    this.questions.delete(question);
  }
}
