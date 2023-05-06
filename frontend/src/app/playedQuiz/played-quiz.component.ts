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

      // Attribution d'un multiplicateur de points en fonction de la difficulté
      let pointMultiplier = 0;
      switch (this.quiz.difficulty) {
        case 'Facile':
          pointMultiplier = 10;
          break;
        case 'Moyen':
          pointMultiplier = 20;
          break;
        case 'Difficile':
          pointMultiplier = 30;
          break;
        default:
          break;
      }

      totalPoints += result.right_answers * pointMultiplier;
    }

    this.totalScore = totalPoints;
    const successRateString = Number(
      (totalCorrectAnswers / totalQuestions) * 100
    ).toFixed(2);
    this.successRate = Number(successRateString);
  }
}
