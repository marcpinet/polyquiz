import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Question, Theme, Quiz, Answer } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { QuestionCreateComponent } from './question-create/question-create.component';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
})
export class AddQuizComponent implements OnInit {
  quiz: Quiz;
  questionsAnswers: Map<Question, Answer[]> = new Map<Question, Answer[]>();
  currentTab = 'QUIZ_CREATE';

  components = {
    QUIZ_CREATE: QuizCreateComponent,
    QUESTION_CREATE: QuestionCreateComponent,
  };

  constructor(
    private quizService: QuizService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  uploadQuiz() {
    //remember to change questions quizId here
  }

  loadTabComponent(tabName: string) {
    this.currentTab = tabName;
  }

  loadQuiz(quiz: Quiz) {
    this.quiz = quiz;
    console.log(this.quiz);
  }

  addQuestionAnswer(question: Question, answers: Answer[]) {
    this.questionsAnswers.set(question, answers);
    console.log(this.questionsAnswers);
  }

  ngOnInit() {}
}
