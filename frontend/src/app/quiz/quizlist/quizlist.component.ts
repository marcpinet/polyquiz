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

  public showDifficultyFilter = false;
  public showDoneFilter = false;
  public showThemeFilter = false;
  public difficulties = ['Facile', 'Moyen', 'Difficile'];
  public done = ['Fait', 'Non fait'];
  public selectedDifficulty: string = 'Difficulté';
  public selectedDone: string = 'Fait / Non fait';
  public selectedTheme: string = 'Thème';

  public filteredQuizList: Quiz[] = [];

  constructor(
    private router: Router,
    public quizService: QuizService,
    private themeService: ThemesService
  ) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
      this.filteredQuizList = [...this.quizList]; // Initialise la liste filtrée avec tous les quiz
      this.populateThemes();
    });
  }

  onDifficultyClick(difficulty: string): void {
    this.selectedDifficulty = difficulty;
    this.showDifficultyFilter = false;
    this.filterQuizzes();
  }

  filterQuizzes(): void {
    if (this.selectedDifficulty === 'Difficulté') {
      this.filteredQuizList = [...this.quizList];
    } else {
      this.filteredQuizList = this.quizList.filter(
        (quiz) => quiz.difficulty === this.selectedDifficulty
      );
    }
  }

  resetFilters(): void {
    this.selectedDifficulty = 'Difficulté';
    this.selectedTheme = 'Thème';
    this.selectedDone = 'Fait/Non fait';
    this.filteredQuizList = [...this.quizList];
  }

  onDoneClick(status: string): void {
    this.selectedDone = status;
    this.showDoneFilter = false;
    // Implémenter la logique de filtrage du status ici
  }

  onThemeClick(theme: Theme): void {
    this.selectedTheme = theme.name;
    this.showThemeFilter = false;
    // Implémenter la logique de filtrage du thème ici
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
