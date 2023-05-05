import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/user.model';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { ResultService } from 'src/services/result.service';
@Component({
  selector: 'app-mes-resultats',
  templateUrl: './mes-resultat.component.html',
})
export class MesResultatsComponent implements OnInit {
  user: User;
  playedQuizzes: Quiz[];
  constructor(
    private authService: AuthService,
    private quizService: QuizService,
    private resultService: ResultService
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {}
}
