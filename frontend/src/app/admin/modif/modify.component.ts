import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, Theme, Quiz, Answer } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { ModifyQuizAdminComponent } from './modifyQuiz/modify-quiz.component';
import { ModifyQuestionAdminComponent } from './modifQuestion/modify-question.component';

@Component({
  selector: 'modify-quiz',
  templateUrl: './modify.component.html',
})
export class ModifyQuizComponent {
  quiz: Quiz;
  questionsAnswers: Map<Question, Answer[]> = new Map<Question, Answer[]>();
  currentTab = 'QUIZ_MODIFY';
  modifyQuestion: Question;
  modifyAnswers: Answer[];

  components = {
    QUIZ_MODIFY: ModifyQuestionAdminComponent,
    QUESTION_MODIFY: ModifyQuizAdminComponent,
  };

  constructor(private quizService: QuizService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.retrieveQuizzes();
    this.quizService.getQuizById(id).subscribe((quiz) => {
      this.quiz = quiz;
    });
  }

  loadTabComponent(tabName: string) {
    this.currentTab = tabName;
  }

  loadQuiz(quiz: Quiz) {
    this.quiz = quiz;
    console.log(quiz);
  }

  loadModifyQuestion(question: Question) {
    this.modifyQuestion = question;
    this.modifyAnswers = this.questionsAnswers.get(question);
  }

  deleteQuestion(question: Question) {
    this.questionsAnswers.delete(question);
  }

  uploadQuiz(quiz: Quiz) {
    this.quiz = quiz;
    this.quizService.createQuiz(this.quiz, this.questionsAnswers);
    console.log(this.questionsAnswers);
    console.log(this.quiz);
  }

  addQuestionAnswer(question: Question, answers: Answer[]) {
    this.questionsAnswers.set(question, answers);
  }
}
