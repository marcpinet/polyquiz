import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Quiz } from 'src/models/quiz.model';
import { Result } from 'src/models/result-quiz.model';

@Component({
  selector: 'app-played-quiz',
  templateUrl: './played-quiz.component.html',
})
export class PlayedQuizComponent implements OnInit {
  @Input() quiz: Quiz;
  @Input() results: Result[];

  totalScore: number | null = null;
  successRate: number | null = null;
  numberOfAttempts: number | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    let totalQuestions = 0;
    let totalCorrectAnswers = 0;
    let totalPoints = 0;

    this.numberOfAttempts = this.results.length;

    for (const result of this.results) {
      const questions = result.right_answers + result.wrong_answers;
      totalQuestions += questions;
      totalCorrectAnswers += result.right_answers;

      let pointMultiplier = 0;
      switch (this.quiz.difficulty) {
        case 'Facile':
          pointMultiplier = 100;
          break;
        case 'Moyen':
          pointMultiplier = 200;
          break;
        case 'Difficile':
          pointMultiplier = 300;
          break;
        default:
          break;
      }

      const correctPercentage = result.right_answers / questions;
      totalPoints += correctPercentage * pointMultiplier;
    }

    this.totalScore = Math.round(totalPoints);
    const successRateString = Number(
      (totalCorrectAnswers / totalQuestions) * 100
    ).toFixed(2);
    this.successRate = Number(successRateString);
  }
}
