import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { ThemesService } from 'src/services/theme.service';
import { Theme } from 'src/models/quiz.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'quizlist',
  templateUrl: './quizlist.component.html',
  styleUrls: ['./quizlist.component.scss'],
})
export class QuizListComponent implements OnInit {
  public quizList: Quiz[] = [];
  public themes: Theme[] = [];

  public difficulties = ['Facile', 'Moyen', 'Difficile'];
  public done = ['Fait', 'Non fait'];
  public selectedDifficulty: string = 'Difficulté';
  public selectedDone: string = 'Fait / Non fait';
  public selectedTheme: string = 'Thème';
  public selectedDuration = 'Durée';
  public durations = ['< 5 min', '5 min < 10 min', '> 10 min'];

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

  filterQuizzes(): void {
    this.filteredQuizList = this.quizList.filter((quiz) => {
      let difficultyMatch = true;
      let doneMatch = true;
      let themeMatch = true;
      let durationMatch = true;

      if (this.selectedDifficulty !== 'Difficulté') {
        difficultyMatch = quiz.difficulty === this.selectedDifficulty;
      }

      if (this.selectedDuration !== 'Durée') {
        if (this.selectedDuration === '< 5 min') {
          durationMatch = quiz.estimated_time < 5;
        } else if (this.selectedDuration === '5 min < 10 min') {
          durationMatch = quiz.estimated_time >= 5 && quiz.estimated_time <= 10;
        } else if (this.selectedDuration === '> 10 min') {
          durationMatch = quiz.estimated_time > 10;
        }
      }

      return difficultyMatch && doneMatch && themeMatch && durationMatch;
    });
  }

  resetFilters(): void {
    this.selectedDifficulty = 'Difficulté';
    this.selectedTheme = 'Thème';
    this.selectedDone = 'Fait/Non fait';
    this.filteredQuizList = [...this.quizList];
  }

  randomQuiz(): void {
    const randomIndex = Math.floor(Math.random() * this.quizList.length);
    const randomQuiz = this.quizList[randomIndex];
    this.filteredQuizList = [randomQuiz];
  }

  async openDifficultyFilter() {
    const { value: difficulty } = await Swal.fire({
      title: 'Sélectionnez la difficulté',
      input: 'select',
      inputOptions: {
        Facile: 'Facile',
        Moyen: 'Moyen',
        Difficile: 'Difficile',
      },
      showCancelButton: true,
    });

    if (difficulty) {
      this.selectedDifficulty = difficulty;
      this.filterQuizzes();
    }
  }

  async openDoneFilter() {
    const { value: done } = await Swal.fire({
      title: 'Sélectionnez le statut',
      input: 'select',
      inputOptions: {
        Fait: 'Fait',
        'Non fait': 'Non fait',
      },
      showCancelButton: true,
    });

    if (done) {
      this.selectedDone = done;
      // Implémenter la logique de filtrage du status ici
    }
  }

  async openThemeFilter() {
    const inputOptions = {};
    this.themes.forEach((theme) => {
      inputOptions[theme.id] = theme.name;
    });

    const { value: theme } = await Swal.fire({
      title: 'Sélectionnez le thème',
      input: 'select',
      inputOptions: inputOptions,
      showCancelButton: true,
    });

    if (theme) {
      this.selectedTheme = inputOptions[theme];
      // Implémenter la logique de filtrage du thème ici
    }
  }

  async openDurationFilter() {
    const { value: duration } = await Swal.fire({
      title: 'Sélectionnez la durée',
      input: 'select',
      inputOptions: {
        '< 5 min': '< 5 min',
        '5 min < 10 min': '5 min < 10 min',
        '> 10 min': '> 10 min',
      },
      showCancelButton: true,
    });

    if (duration) {
      this.selectedDuration = duration;
      this.filterQuizzes();
    }
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
