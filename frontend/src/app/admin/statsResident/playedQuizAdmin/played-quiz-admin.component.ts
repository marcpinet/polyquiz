import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Quiz } from 'src/models/quiz.model';
import { Result } from 'src/models/result-quiz.model';

@Component({
  selector: 'app-played-quiz-admin',
  templateUrl: './played-quiz-admin.component.html',
})
export class PlayedQuizAdminComponent implements OnInit {
  @Input() quiz: Quiz;
  @Input() results: Result[];

  nbClickErrorPerQuestion: number | null = null;
  averageTimePerQuestion: number | null = null;
  successRate: number | null = null;
  numberOfAttempts: number | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    let totalQuestions = 0;
    let totalCorrectAnswers = 0;
    let totalClickError = 0;
    let totalQuestionWithConfirmation = 0;
    let totalTime = 0;

    this.numberOfAttempts = this.results.length;

    for (const result of this.results) {
      const questions = result.right_answers + result.wrong_answers;
      totalQuestions += questions;
      totalCorrectAnswers += result.right_answers;
      totalTime += result.play_time;
      if (result.click_error != -1) {
        totalClickError += result.click_error;
        totalQuestionWithConfirmation += questions;
      }
    }
    this.averageTimePerQuestion = Number(
      (totalTime / totalQuestions).toFixed(2)
    );
    this.nbClickErrorPerQuestion = Number(
      (totalClickError / totalQuestionWithConfirmation).toFixed(2)
    );
    const successRateString = Number(
      (totalCorrectAnswers / totalQuestions) * 100
    ).toFixed(2);
    this.successRate = Number(successRateString);
  }

  compilTime(time: number) {
    var tmp = '';
    if (time > 60) {
      tmp += Math.floor(time / 60) + 'm';
    }
    tmp += (time % 60).toFixed(2) + 's';
    return tmp;
  }
}
