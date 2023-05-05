import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  constructor(
    private authService: AuthService,
    private quizService: QuizService,
    private resultService: ResultService
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.resultService.getResultsByUser(this.user).subscribe((results) => {
      // Create a set of unique quiz IDs played by the user
      let quizIds = new Set<string>();
      for (let i = 0; i < results.length; i++) {
        let result = results[i];
        quizIds.add(result.quiz_id);
      }

      // For each unique quiz ID, fetch the quiz object and results associated with it
      let quizIdsArray = Array.from(quizIds);
      for (let i = 0; i < quizIdsArray.length; i++) {
        let quizId = quizIdsArray[i];
        this.quizService.getQuizById(quizId).subscribe((quiz) => {
          let quizResults = results.filter(
            (result) => result.quiz_id === quizId
          );
          this.playedQuizzes.set(quiz, quizResults);
        });
      }
    });
  }

  ngOnInit() {}
}
