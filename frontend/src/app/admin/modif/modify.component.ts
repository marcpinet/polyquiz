import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, Theme, Quiz, Answer } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { ModifyQuizAdminComponent } from './modifyQuiz/modify-quiz.component';
import { ModifyQuestionAdminComponent } from './modifQuestion/modify-question.component';

@Component({
  selector: 'app-modify-quiz-base',
  templateUrl: './modify.component.html',
})
export class ModifyQuizComponent {
  quiz: Quiz;
  questionsAnswers: Map<Question, Answer[]> = new Map<Question, Answer[]>();
  currentTab = '';
  modifyQuestion: Question;
  modifyAnswers: Answer[];

  components = {
    QUIZ_MODIFY: ModifyQuestionAdminComponent,
    QUESTION_MODIFY: ModifyQuizAdminComponent,
  };

  constructor(private quizService: QuizService, private route: ActivatedRoute) {
    this.quiz = {} as Quiz;
    console.log('modify component');
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.retrieveQuizzes();
    this.quizService.getQuizById(id).subscribe((quiz) => {
      this.quiz = quiz;
      console.log('aaaaaaaaaaa');
      console.log(this.quiz);
      this.currentTab = 'QUIZ_MODIFY';
      console.log('aaaaaaaaaaa');
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
