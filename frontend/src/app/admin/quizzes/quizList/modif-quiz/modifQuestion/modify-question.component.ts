import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
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
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modify-question-admin',
  templateUrl: './modify-question.component.html',
})
export class ModifyQuestionAdminComponent implements OnInit {
  @Input() question: Question;
  @Input() answers: Answer[];
  @Output() addQuestionAnswer = new EventEmitter<{
    question: Question;
    answers: Answer[];
  }>();
  @Output() loadTabComponent = new EventEmitter<string>();
  questionForm: FormGroup;
  quiz: Quiz;
  themes: Theme[] = [];
  constructor(
    public router: Router,
    public quizService: QuizService,
    public route: ActivatedRoute,
    private http: HttpClient,
    private formbuilder: FormBuilder,
    private themeService: ThemesService
  ) {
    this.themeService.themes$.subscribe((themes) => {
      this.themes = themes;
    });

    this.questionForm = this.formbuilder.group({
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

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if ('question' in changes) {
      this.question = changes['question'].currentValue;
      this.updateForm();
    }
  }

  updateForm() {
    if (this.question != undefined) {
      this.questionForm.patchValue({
        questionImage: this.question.question_image,
        questionText: this.question.question_text,
        explainText: this.question.explain_text,
        explainImage: this.question.explain_image,
      });
    }
    if (this.answers != undefined) {
      if (this.answers.length > 0) {
        this.questionForm.patchValue({
          reponse1: this.answers[0].answer_text,
          reponse1Image: this.answers[0].answer_image,
        });
      }
      if (this.answers.length > 1) {
        this.questionForm.patchValue({
          reponse2: this.answers[1].answer_text,
          reponse2Image: this.answers[1].answer_image,
        });
      }
      if (this.answers.length > 2) {
        this.questionForm.patchValue({
          reponse3: this.answers[2].answer_text,
          reponse3Image: this.answers[2].answer_image,
        });
      }
      if (this.answers.length > 3) {
        this.questionForm.patchValue({
          reponse4: this.answers[3].answer_text,
          reponse4Image: this.answers[3].answer_image,
        });
      }
      this.answers.forEach((answer) => {
        if (answer.isCorrect) {
          this.questionForm.patchValue({
            validreponse: this.answers.indexOf(answer),
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
    this.answers = [];

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
    console.log('aaa');
    console.log(this.answers);
    this.addQuestionAnswer.emit({
      question: this.question,
      answers: this.answers,
    });

    this.loadTabComponent.emit('QUIZ_MODIFY');

    console.log('ok');
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
        this.loadTabComponent.emit('QUIZ_MODIFY');
      } else {
        return;
      }
    });
  }
}
