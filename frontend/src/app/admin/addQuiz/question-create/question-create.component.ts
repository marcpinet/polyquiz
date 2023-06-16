import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resident } from 'src/models/resident.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, Theme, Quiz, Answer } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import Swal from 'sweetalert2';
import { find } from 'rxjs';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
})
export class QuestionCreateComponent implements OnInit {
  @Input() modifyQuestion: Question;
  @Input() modifyAnswers: Answer[];
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
      questionImage: [''],
      questionText: ['', Validators.required],
      explainText: ['', Validators.required],
      explainImage: [''],
      reponse1: ['', Validators.required],
      reponse1Image: [''],
      reponse2: ['', Validators.required],
      reponse2Image: [''],
      reponse3: [''],
      reponse3Image: [''],
      reponse4: [''],
      reponse4Image: [''],
      validresponse: ['', Validators.required],
    });
    console.log('Question create component');
  }

  ngOnInit() {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('modifyQuestion' in changes) {
      this.modifyQuestion = changes['modifyQuestion'].currentValue;
      this.updateForm();
    }
  }

  updateForm() {
    if (this.modifyQuestion != undefined) {
      this.questionForm.patchValue({
        questionImage: this.modifyQuestion.question_image,
        questionText: this.modifyQuestion.question_text,
        explainText: this.modifyQuestion.explain_text,
        explainImage: this.modifyQuestion.explain_image,
      });
    }
    if (this.modifyAnswers != undefined) {
      if (this.modifyAnswers.length > 0) {
        this.questionForm.patchValue({
          reponse1: this.modifyAnswers[0].answer_text,
          reponse1Image: this.modifyAnswers[0].answer_image,
        });
      }
      if (this.modifyAnswers.length > 1) {
        this.questionForm.patchValue({
          reponse2: this.modifyAnswers[1].answer_text,
          reponse2Image: this.modifyAnswers[1].answer_image,
        });
      }
      if (this.modifyAnswers.length > 2) {
        this.questionForm.patchValue({
          reponse3: this.modifyAnswers[2].answer_text,
          reponse3Image: this.modifyAnswers[2].answer_image,
        });
      }
      if (this.modifyAnswers.length > 3) {
        this.questionForm.patchValue({
          reponse4: this.modifyAnswers[3].answer_text,
          reponse4Image: this.modifyAnswers[3].answer_image,
        });
      }
      this.modifyAnswers.forEach((answer) => {
        if (answer.isCorrect) {
          this.questionForm.patchValue({
            validresponse: this.modifyAnswers.indexOf(answer),
          });
        }
      });
    }
  }

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

    switch (this.questionForm.get('validresponse').value) {
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
