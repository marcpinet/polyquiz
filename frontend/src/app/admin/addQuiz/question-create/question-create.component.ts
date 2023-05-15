import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resident } from 'src/models/resident.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, Theme, Quiz, Answer } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
})
export class QuestionCreateComponent implements OnInit {
  @Input() modifyQuestion: Question = null;

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

    if (this.modifyQuestion != null) {
      this.questionForm = this.formBuilder.group({
        questionImage: [
          this.modifyQuestion.question_image,
          Validators.required,
        ],
        questionText: [this.modifyQuestion.question_text, Validators.required],
        explainText: [this.modifyQuestion.explain_text, Validators.required],
        explainImage: [this.modifyQuestion.explain_image, Validators.required],
        reponse1: [
          this.modifyQuestion.answers[0].answer_text,
          Validators.required,
        ],
        reponse1Image: [
          this.modifyQuestion.answers[0].answer_image,
          Validators.required,
        ],
        reponse2: [
          this.modifyQuestion.answers[0].answer_text,
          Validators.required,
        ],
        reponse2Image: [
          this.modifyQuestion.answers[0].answer_image,
          Validators.required,
        ],
        reponse3: [
          this.modifyQuestion.answers[0].answer_text,
          Validators.required,
        ],
        reponse3Image: [
          this.modifyQuestion.answers[0].answer_image,
          Validators.required,
        ],
        reponse4: [
          this.modifyQuestion.answers[0].answer_text,
          Validators.required,
        ],
        reponse4Image: [
          this.modifyQuestion.answers[0].answer_image,
          Validators.required,
        ],
        validreponse: ['', Validators.required],
      });
    } else {
      this.questionForm = this.formBuilder.group({
        questionImage: ['', Validators.required],
        questionText: ['', Validators.required],
        explainText: ['', Validators.required],
        explainImage: ['', Validators.required],
        reponse1: ['', Validators.required],
        reponse1Image: ['', Validators.required],
        reponse2: ['', Validators.required],
        reponse2Image: ['', Validators.required],
        reponse3: ['', Validators.required],
        reponse3Image: ['', Validators.required],
        reponse4: ['', Validators.required],
        reponse4Image: ['', Validators.required],
        validreponse: ['', Validators.required],
      });
    }
    console.log('Question create component');
  }

  ngOnInit() {}

  public addQuestion(): void {
    this.question = {
      question_text: this.questionForm.get('questionText').value,
      explain_text: this.questionForm.get('explainText').value,
    };
    if (this.questionForm.get('questionImage').value !== '') {
      this.question.question_image =
        this.questionForm.get('questionImage').value;
    }
    if (this.questionForm.get('explainImage').value !== '') {
      this.question.explain_image = this.questionForm.get('explainImage').value;
    }

    for (let i = 1; i <= 4; i++) {
      const answer_text = this.questionForm.get(`reponse${i}`).value;
      const answer_image = this.questionForm.get(`reponse${i}Image`).value;

      if (answer_text) {
        const answer: Answer = { isCorrect: false, answer_text };
        if (answer_image !== '') {
          answer.answer_image = answer_image;
        }
        this.answers.push(answer);
      }
    }

    switch (this.questionForm.get('validreponse').value) {
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

  public return(): void {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir quitter ?',
      text: 'Vous allez perdre toutes les données saisies',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, quitter',
      cancelButtonText: 'Non, rester',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadTabComponent.emit('QUIZ_CREATE');
      } else {
        return;
      }
    });
  }
}
