import { Component, HostListener, Input } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Quiz, Theme } from 'src/models/quiz.model';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss'],
})
export class QuizDetailsComponent {
  @Input() quiz: Quiz;
  @Input() played: boolean = false;

  constructor(private router: Router) {}

  onClick() {
    console.log('send: ' + this.quiz.id);
    this.router.navigate(['/game', this.quiz.id]);
  }
}
