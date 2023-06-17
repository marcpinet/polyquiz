import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/user.model';
import { Result } from 'src/models/result-quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { ResultService } from 'src/services/result.service';
import { Quiz } from 'src/models/quiz.model';

@Component({
  selector: 'app-mes-resultats',
  templateUrl: './mes-resultat.component.html',
})
export class MesResultatsComponent implements OnInit {
  user: User;
  playedQuizData: {
    quiz: Quiz;
    score: number;
    successRate: number;
    numberOfAttempts: number;
  }[] = [];

  totalScore: number | null = null;
  successRate: number | null = null;

  constructor(
    private authService: AuthService,
    private quizService: QuizService,
    private resultService: ResultService
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.resultService
      .getResultsByUser(this.user)
      .subscribe(async (results) => {
        let quizIds = new Set<string>();
        for (const element of results) {
          let result = element;
          quizIds.add(result.quiz_id);
        }

        let quizIdsArray = Array.from(quizIds);
        for (const element of quizIdsArray) {
          let quizId = element;
          const quiz = await this.quizService.getQuizById(quizId).toPromise();
          let quizResults = results.filter(
            (result) => result.quiz_id === quizId
          );

          let totalQuestions = 0;
          let totalCorrectAnswers = 0;
          let totalPoints = 0;

          let maxPoints = 0;
          switch (quiz.difficulty) {
            case 'Facile':
              maxPoints = 100;
              break;
            case 'Moyen':
              maxPoints = 200;
              break;
            case 'Difficile':
              maxPoints = 300;
              break;
            default:
              break;
          }

          for (const result of quizResults) {
            const questions = result.right_answers + result.wrong_answers;
            totalQuestions += questions;
            totalCorrectAnswers += result.right_answers;

            const correctPercentage = result.right_answers / questions;
            totalPoints += correctPercentage * maxPoints;
          }

          const score = Math.round(totalPoints / quizResults.length); // Calculate average score per quiz
          const successRate = (totalCorrectAnswers / totalQuestions) * 100 || 0;
          const numberOfAttempts = quizResults.length;

          this.playedQuizData.push({
            quiz,
            score,
            successRate: Number(successRate.toFixed(1)),
            numberOfAttempts,
          });
        }

        const successRateSum = this.playedQuizData.reduce(
          (sum, entry) => sum + entry.successRate,
          0
        );

        this.totalScore = Math.round(
          this.playedQuizData.reduce((sum, entry) => sum + entry.score, 0)
        );
        this.successRate =
          this.playedQuizData.length > 0
            ? successRateSum / this.playedQuizData.length
            : 0;
      });
  }

  ngOnInit() {}
}
