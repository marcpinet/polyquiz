import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Quiz } from 'src/models/quiz.model';
import { Result } from 'src/models/result-quiz.model';

@Component({
  selector: 'app-played-quiz',
  templateUrl: './played-quiz.component.html',
})
export class PlayedQuizComponent {
  @Input() quiz: Quiz;
  @Input() score: number;
  @Input() successRate: number;
  @Input() numberOfAttempts: number;

  constructor(private authService: AuthService) {}
}
