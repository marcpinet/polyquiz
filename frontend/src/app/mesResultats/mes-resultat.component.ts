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
  playedQuizzes: Map<Quiz, Result[]> = new Map<Quiz, Result[]>();

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
        let totalQuestions = 0;
        let totalCorrectAnswers = 0;
        let totalPoints = 0;

        // Create a set of unique quiz IDs played by the user
        let quizIds = new Set<string>();
        for (const element of results) {
          let result = element;
          quizIds.add(result.quiz_id);
        }

        // For each unique quiz ID, fetch the quiz object and results associated with it
        let quizIdsArray = Array.from(quizIds);
        for (const element of quizIdsArray) {
          let quizId = element;
          const quiz = await this.quizService.getQuizById(quizId).toPromise();
          let quizResults = results.filter(
            (result) => result.quiz_id === quizId
          );
          this.playedQuizzes.set(quiz, quizResults);

          for (const result of quizResults) {
            const questions = result.right_answers + result.wrong_answers;
            totalQuestions += questions;
            totalCorrectAnswers += result.right_answers;

            // Attribution d'un multiplicateur de points en fonction de la difficulté
            let pointMultiplier = 0;
            switch (quiz.difficulty) {
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
        }

        this.totalScore = totalPoints;
        this.successRate = (totalCorrectAnswers / totalQuestions) * 100;
      });
  }

  ngOnInit() {}
}
