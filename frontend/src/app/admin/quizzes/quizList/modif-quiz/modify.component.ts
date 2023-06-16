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
  tmp: Map<Question, Answer[]> = new Map<Question, Answer[]>();

  components = {
    QUIZ_MODIFY: ModifyQuestionAdminComponent,
    QUESTION_MODIFY: ModifyQuizAdminComponent,
  };

  constructor(private quizService: QuizService, private route: ActivatedRoute) {
    this.quiz = {} as Quiz;
    console.log('modify component');
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.getQuizById(id).subscribe((quiz) => {
      this.quiz = quiz;
      console.log(quiz);
      for (let i = 0; i < this.quiz.questions.length; i++) {
        this.tmp.set(this.quiz.questions[i], this.quiz.questions[i].answers);
        this.questionsAnswers.set(
          this.quiz.questions[i],
          this.quiz.questions[i].answers
        );
      }
      console.log(this.quiz.questions);
      this.currentTab = 'QUIZ_MODIFY';
    });
  }

  loadTabComponent(tabName: string) {
    this.currentTab = tabName;
  }

  loadQuiz(quiz: Quiz) {
    this.quiz = quiz;
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
    //create a doublicate quiz wil only id,   name, difficulty, image, description, estimated_time, themeId but without questions and answers
    const quizModify: Quiz = {
      id: this.quiz.id,
      name: this.quiz.name,
      difficulty: this.quiz.difficulty,
      image: this.quiz.image,
      description: this.quiz.description,
      estimated_time: this.quiz.estimated_time,
      themeId: this.quiz.themeId,
    };
    const questions: Question[] = [];
    this.questionsAnswers.forEach((value, key) => {
      const question: Question = {
        id: key.id,
        quizId: key.quizId,
        question_text: key.question_text,
        explain_text: key.explain_text,
      };
      if (key.explain_image !== undefined) {
        question.explain_image = key.explain_image;
      }
      if (key.question_image !== undefined) {
        question.question_image = key.question_image;
      }
      questions.push(question);
    });
    const answers: Answer[] = [];
    this.questionsAnswers.forEach((value, key) => {
      for (let i = 0; i < value.length; i++) {
        const answer: Answer = {
          id: value[i].id,
          isCorrect: value[i].isCorrect,
          answer_text: value[i].answer_text,
          answer_image: value[i].answer_image,
        };
        answers.push(answer);
      }
    });
    console.log(this.tmp);
    this.quizService.updateQuiz(quizModify, questions, answers);
    console.log(this.questionsAnswers);
    console.log(this.quiz);
  }

  addQuestionAnswer(question: Question, answers: Answer[]) {
    this.questionsAnswers.set(question, answers);
  }
}
