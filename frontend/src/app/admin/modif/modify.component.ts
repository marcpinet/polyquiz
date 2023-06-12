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
  id: string;
  modifyQuestion: Question;
  modifyAnswers: Answer[];
  tmp: Map<Question, Answer[]> = new Map<Question, Answer[]>();

  components = {
    QUIZ_MODIFY: ModifyQuestionAdminComponent,
    QUESTION_MODIFY: ModifyQuizAdminComponent,
  };

  constructor(private quizService: QuizService, private route: ActivatedRoute) {
    this.quiz = {} as Quiz;
    console.log('modify component');
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    this.quizService.retrieveQuizzes();
    this.quizService.getQuizById(id).subscribe((quiz) => {
      this.quiz = quiz;
      for (let i = 0; i < this.quiz.questions.length; i++) {
        this.tmp.set(this.quiz.questions[i], this.quiz.questions[i].answers);
        this.questionsAnswers.set(
          this.quiz.questions[i],
          this.quiz.questions[i].answers
        );
      }
      console.log('aaaaaaaaaaa');
      console.log(this.quiz.questions);
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
    this.quiz.id = this.id;
    this.quizService.deleteQuiz(this.quiz);
    this.quizService.createQuiz(this.quiz, this.tmp);
    console.log(this.questionsAnswers);
    console.log(this.quiz);
  }

  addQuestionAnswer(question: Question, answers: Answer[]) {
    this.questionsAnswers.set(question, answers);
  }
}
