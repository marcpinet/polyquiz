import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { ThemesService } from 'src/services/theme.service';
import { Theme } from 'src/models/quiz.model';
@Component({
  selector: 'quizlist',
  templateUrl: './quizlist.component.html',
  styleUrls: ['./quizlist.component.scss'],
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public themes: Theme[] = [];

  constructor(private router: Router, public quizService: QuizService, private themeService: ThemesService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
      this.populateThemes();
    });
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
      this.themeService.themeSelected$.subscribe(theme => {
        for (const quiz of this.quizList) {
          if (quiz.themeId.toString() === theme.id) {
            quiz.theme = theme;
          }
        }
      });
    }
  }


  ngOnInit(): void {
  }

}
