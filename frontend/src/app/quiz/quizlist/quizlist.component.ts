import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { ThemesService } from 'src/services/theme.service';
import { Theme } from 'src/models/quiz.model';
import Swal from 'sweetalert2';
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
  public themeList: Theme[] = [];
  public playedQuizIds: string[] = [];
  public user: User;

  public difficulties = ['Facile', 'Moyen', 'Difficile'];
  public done = ['Fait', 'Non fait'];
  public themes: string[] = [];
  public selectedDifficulty: string = 'Difficulté';
  public selectedDone: string = 'Progrès';
  public selectedTheme: string = 'Thème';
  public selectedDuration = 'Durée';
  public durations = ['< 5 min', '5 min < 10 min', '> 10 min'];

  public filteredQuizList: Quiz[] = [];

  public currentPage: number = 1;
  public pageSize: number = 6;

  constructor(
    private router: Router,
    public quizService: QuizService,
    private themeService: ThemesService,
    private authService: AuthService,
    private resultService: ResultService
  ) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
      this.filteredQuizList = [...this.quizList]; // Initialise la liste filtrée avec tous les quiz
    });

    this.authService.user$.subscribe((user) => {
      this.user = user;

      this.resultService.getResultsByUser(user).subscribe((results) => {
        this.playedQuizIds = results.map((result) => result.quiz_id);
      });
    });

    this.themeService.themes$.subscribe((themes) => {
      for (const theme of themes) {
        this.themes.push(theme.name);
      }
      this.themeList = themes;
    });
  }

  hasPlayedQuiz(quizId: string): boolean {
    return this.playedQuizIds.includes(quizId);
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

      if (this.selectedTheme !== 'Thème') {
        this.themeList.forEach((theme) => {
          if (theme.name === this.selectedTheme) {
            themeMatch = quiz.themeId === Number(theme.id);
          }
        });
      }

      if (this.selectedDone !== 'Progrès') {
        if (this.selectedDone === 'Fait') {
          doneMatch = this.hasPlayedQuiz(quiz.id);
        } else if (this.selectedDone === 'Non fait') {
          doneMatch = !this.hasPlayedQuiz(quiz.id);
        }
      }

      return difficultyMatch && doneMatch && themeMatch && durationMatch;
    });

    let start = (this.currentPage - 1) * this.pageSize;
    let end = start + this.pageSize;
    this.filteredQuizList = this.filteredQuizList.slice(start, end);
  }

  nextPage(): void {
    this.currentPage++;
    this.filterQuizzes();
  }

  prevPage(): void {
    this.currentPage--;
    this.filterQuizzes();
  }

  resetFilters(): void {
    this.selectedDifficulty = 'Difficulté';
    this.selectedTheme = 'Thème';
    this.selectedDone = 'Progrès';
    this.selectedDuration = 'Durée';
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
      this.filterQuizzes();
    }
  }

  async openThemeFilter() {
    const inputOptions = {};
    this.themes.forEach((theme) => {
      inputOptions[theme] = theme;
    });

    const { value: theme } = await Swal.fire({
      title: 'Sélectionnez le thème',
      input: 'select',
      inputOptions: inputOptions,
      showCancelButton: true,
    });

    if (theme) {
      this.selectedTheme = inputOptions[theme];
      this.filterQuizzes();
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

  ngOnInit(): void {}
}
