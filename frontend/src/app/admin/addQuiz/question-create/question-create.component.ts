import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resident } from 'src/models/resident.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, Theme, Quiz, Answer } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
})
export class QuestionCreateComponent implements OnInit {
  @Output() loadTabComponent = new EventEmitter<string>();
  @Output() addQuestionAnswer = new EventEmitter<{
    question: Question;
    answers: Answer[];
  }>();

  public questionForm: FormGroup;
  question: Question;
  answers: Answer[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    console.log('okkkk');
    this.questionForm = this.formBuilder.group({
      questionImage: ['', Validators.required],
      questionText: ['', Validators.required],
      explainText: ['', Validators.required],
      explainImage: ['', Validators.required],
      'Réponse 1': ['', Validators.required],
      'Réponse 1 image': ['', Validators.required],
      'Réponse 2': ['', Validators.required],
      'Réponse 2 image': ['', Validators.required],
      'Réponse 3': ['', Validators.required],
      'Réponse 3 image': ['', Validators.required],
      'Réponse 4': ['', Validators.required],
      'Réponse 4 image': ['', Validators.required],
      validResponse: ['', Validators.required],
    });
    console.log('Question create component');
  }

  ngOnInit() {}

  public addQuestion(): void {
    this.question = {
      question_text: this.questionForm.get('questionText').value,
      question_image: this.questionForm.get('questionImage').value,
      explain_text: this.questionForm.get('explainText').value,
      explain_image: this.questionForm.get('explainImage').value,
    };
    this.answers.push({
      isCorrect: true,
      answer_text: this.questionForm.get('Réponse 1').value,
      answer_image: this.questionForm.get('Réponse 1 image').value,
    });
    this.answers.push({
      isCorrect: false,
      answer_text: this.questionForm.get('Réponse 2').value,
      answer_image: this.questionForm.get('Réponse 2 image').value,
    });
    this.answers.push({
      isCorrect: false,
      answer_text: this.questionForm.get('Réponse 3').value,
      answer_image: this.questionForm.get('Réponse 3 image').value,
    });
    this.answers.push({
      isCorrect: false,
      answer_text: this.questionForm.get('Réponse 4').value,
      answer_image: this.questionForm.get('Réponse 4 image').value,
    });
    switch (this.questionForm.get('validResponse').value) {
      default:
        this.answers[0].isCorrect = true;
        break;
      case '1':
        this.answers[1].isCorrect = true;
        break;
      case '2':
        this.answers[2].isCorrect = true;
        break;
      case '3':
        this.answers[3].isCorrect = true;
        break;
    }
    this.loadTabComponent.emit('QUIZ_CREATE');

    this.addQuestionAnswer.emit({
      question: this.question,
      answers: this.answers,
    });
  }
}
