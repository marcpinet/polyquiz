import { Component, HostListener, Input } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Quiz, Theme } from 'src/models/quiz.model';

@Component({
  selector: 'app-quiz-details-carousel',
  templateUrl: './quiz-details-carousel.component.html',
})
export class QuizDetailsCarouselComponent {
  @Input() quiz: Quiz;

  constructor(private router: Router) {}

  onClick() {
    console.log("send2: " + this.quiz.id);
    this.router.navigate(['/game', this.quiz.id]);
  }
}
