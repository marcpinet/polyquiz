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
      for (let i = 0; i < results.length; i++) {
        let result = results[i];
        let quizId = result.quiz_id;

        this.quizService.getQuizById(quizId).subscribe((quiz) => {
          if (!this.playedQuizzes.has(quiz)) {
            this.playedQuizzes.set(quiz, [result]);
          } else {
            let results = this.playedQuizzes.get(quiz);
            results.push(result);
          }
        });
      }
    });
  }

  ngOnInit() {}
}
