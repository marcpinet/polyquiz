import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/user.model';
import { Resident } from 'src/models/resident.model';
import { UserService } from 'src/services/user.service';
import { QuizService } from 'src/services/quiz.service';
import { ResultService } from 'src/services/result.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  user: User;
  resident: Resident;
  totalScore: number | null = null;
  successRate: number | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private quizService: QuizService,
    private resultService: ResultService
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.userService.residents$.subscribe((residents) => {
      this.resident = residents.find(
        (resident) => resident.userId === this.user.id
      );
    });

    this.resultService
      .getResultsByUser(this.user)
      .subscribe(async (results) => {
        let totalQuestions = 0;
        let totalCorrectAnswers = 0;
        let totalPoints = 0;

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

          for (const result of quizResults) {
            const questions = result.right_answers + result.wrong_answers;
            totalQuestions += questions;
            totalCorrectAnswers += result.right_answers;

            let pointMultiplier = 0;
            switch (quiz.difficulty) {
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
        }

        this.totalScore = Math.round(totalPoints);
        this.successRate = (totalCorrectAnswers / totalQuestions) * 100;
      });
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
