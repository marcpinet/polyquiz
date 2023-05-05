import { Component, HostListener, Input } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Quiz, Theme } from 'src/models/quiz.model';

@Component({
  selector: 'app-quiz-details-stats',
  templateUrl: './quiz-details-stats.component.html',
})
export class QuizDetailsStatsComponent {
  @Input() quiz: Quiz;

  constructor(private router: Router) {}

  onClick() {
    console.log('send: ' + this.quiz.id);
    this.router.navigate(['/game', this.quiz.id]);
  }
}
