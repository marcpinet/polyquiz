import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resident } from 'src/models/resident.model';
import { Router } from '@angular/router';
import { Question, Theme, Quiz, Answer } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-register',
  templateUrl: './quiz-create.component.html',
})
export class QuizCreateComponent implements OnInit {
  public quizForm: FormGroup;
  themes: Theme[] = [];
  questions: Question[] = [];
  answers: Answer[] = [];
  quizzes: Quiz[] = [];

  constructor(
    private quizService: QuizService,
    private formBuilder: FormBuilder
  ) {
    this.quizForm = this.formBuilder.group({
      quizImage: ['', Validators.required],
      quizName: ['', [Validators.required]],
      quizDifficulty: ['', Validators.required],
      quizDescription: ['', Validators.required],
      quizEstimatedTime: ['', Validators.required],
      quizTheme: ['', Validators.required],
    });
    //this.quizService.getThemes().subscribe(themes => this.themes = themes);
  }

  ngOnInit() {}

  public addQuiz(): void {}
}
