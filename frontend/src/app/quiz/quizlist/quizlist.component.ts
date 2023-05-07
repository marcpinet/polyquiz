import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { ThemesService } from 'src/services/theme.service';
import { Theme } from 'src/models/quiz.model';
import { AuthService } from 'src/services/auth.service';
import { ResultService } from 'src/services/result.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'quizlist',
  templateUrl: './quizlist.component.html',
  styleUrls: ['./quizlist.component.scss'],
})
export class QuizListComponent implements OnInit {
  public quizList: Quiz[] = [];
  public playedQuizIds: string[] = [];
  public user: User;
  public themes: Theme[] = [];

  constructor(
    private router: Router,
    public quizService: QuizService,
    private themeService: ThemesService,
    private authService: AuthService,
    private resultService: ResultService
  ) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
      this.populateThemes();
    });

    this.authService.user$.subscribe((user) => {
      this.user = user;

      this.resultService.getResultsByUser(user).subscribe((results) => {
        this.playedQuizIds = results.map((result) => result.quiz_id);
      });
    });
  }

  hasPlayedQuiz(quizId: string): boolean {
    return this.playedQuizIds.includes(quizId);
  }

  populateThemes(): void {
    const themeIds = new Set<number>();
    for (const quiz of this.quizList) {
      if (!this.themes[quiz.themeId]) {
        themeIds.add(quiz.themeId);
      }
    }

    for (const themeId of themeIds) {
      this.themeService.setSelectedTheme(themeId.toString());
      this.themeService.themeSelected$.subscribe((theme) => {
        for (const quiz of this.quizList) {
          if (quiz.themeId.toString() === theme.id) {
            quiz.theme = theme;
          }
        }
      });
    }
  }

  ngOnInit(): void {}
}
