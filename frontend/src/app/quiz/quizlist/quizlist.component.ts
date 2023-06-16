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
  public durations = ['< 5 min', '5 min < 10 min', '> 10 min'];
  public selectedDifficulty: string[] = [];
  public selectedDone: string[] = [];
  public selectedTheme: string[] = [];
  public selectedDuration: string[] = [];
  public filteredQuizList: Quiz[] = [];
  public currentPage: number = 1;
  public pageSize: number = 6;
  modals: any[];

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

  ngOnInit(): void {
    this.selectedDifficulty = this.difficulties;
    this.selectedDone = this.done;
    this.selectedDuration = this.durations;
    this.selectedTheme = this.themes;

    this.modals = [
      {
        num: 1,
        title: 'Sélectionnez la difficulté',
        filters: this.difficulties,
        selected: this.selectedDifficulty,
      },
      {
        num: 2,
        title: 'Sélectionnez le progrès',
        filters: this.done,
        selected: this.selectedDone,
      },
      {
        num: 3,
        title: 'Sélectionnez le thème',
        filters: this.themes,
        selected: this.selectedTheme,
      },
      {
        num: 4,
        title: 'Sélectionnez la durée',
        filters: this.durations,
        selected: this.selectedDuration,
      },
    ];
  }

  hasPlayedQuiz(quizId: string): boolean {
    return this.playedQuizIds.includes(quizId);
  }

  setSelectedFilters(filters: string[], modalNum: number) {
    switch (modalNum) {
      case 1:
        this.selectedDifficulty = filters;
        break;
      case 2:
        this.selectedDone = filters;
        break;
      case 3:
        this.selectedTheme = filters;
        break;
      case 4:
        this.selectedDuration = filters;
        break;
      default:
        return;
    }
    this.currentPage = 1;
    this.filterQuizzes();
  }

  getDifficultyLabel(): string {
    if (this.selectedDifficulty === this.difficulties) {
      return 'Difficulté';
    } else {
      let res;
      this.selectedDifficulty.forEach((difficulty) => {
        res += difficulty + ', ';
      });
      return res.slice(0, -2);
    }
  }

  getDoneLabel(): string {
    if (this.selectedDone === this.done) {
      return 'Progrès';
    } else {
      let res;
      this.selectedDone.forEach((done) => {
        res += done + ', ';
      });
      return res.slice(0, -2);
    }
  }

  getThemeLabel(): string {
    if (this.selectedTheme === this.themes) {
      return 'Thème';
    } else {
      let res;
      this.selectedTheme.forEach((theme) => {
        res += theme + ', ';
      });
      return res.slice(0, -2);
    }
  }

  getDurationLabel(): string {
    if (this.selectedDuration === this.durations) {
      return 'Durée';
    } else {
      let res;
      this.selectedDuration.forEach((duration) => {
        res += duration + ', ';
      });
      return res.slice(0, -2);
    }
  }

  filterQuizzes(): void {
    // this.filteredQuizList = this.quizList.filter((quiz) => {
    //   let difficultyMatch = true;
    //   let doneMatch = true;
    //   let themeMatch = true;
    //   let durationMatch = true;
    //   if (this.selectedDifficulty !== 'Difficulté') {
    //     difficultyMatch = quiz.difficulty === this.selectedDifficulty;
    //   }
    //   if (this.selectedDuration !== 'Durée') {
    //     if (this.selectedDuration === '< 5 min') {
    //       durationMatch = quiz.estimated_time < 5;
    //     } else if (this.selectedDuration === '5 min < 10 min') {
    //       durationMatch = quiz.estimated_time >= 5 && quiz.estimated_time <= 10;
    //     } else if (this.selectedDuration === '> 10 min') {
    //       durationMatch = quiz.estimated_time > 10;
    //     }
    //   }
    //   if (this.selectedTheme !== 'Thème') {
    //     this.themeList.forEach((theme) => {
    //       if (theme.name === this.selectedTheme) {
    //         themeMatch = quiz.themeId === Number(theme.id);
    //       }
    //     });
    //   }
    //   if (this.selectedDone !== 'Progrès') {
    //     if (this.selectedDone === 'Fait') {
    //       doneMatch = this.hasPlayedQuiz(quiz.id);
    //     } else if (this.selectedDone === 'Non fait') {
    //       doneMatch = !this.hasPlayedQuiz(quiz.id);
    //     }
    //   }
    //   return difficultyMatch && doneMatch && themeMatch && durationMatch;
    // });
    // let start = (this.currentPage - 1) * this.pageSize;
    // let end = start + this.pageSize;
    // this.filteredQuizList = this.filteredQuizList.slice(start, end);
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
    this.selectedDifficulty = [];
    this.selectedDone = [];
    this.selectedTheme = [];
    this.selectedDuration = [];
    this.filteredQuizList = [...this.quizList];
  }

  randomQuiz(): void {
    const randomIndex = Math.floor(Math.random() * this.quizList.length);
    const randomQuiz = this.quizList[randomIndex];
    this.filteredQuizList = [randomQuiz];
  }

  openFilterModal(item: String) {
    let dialog;
    switch (item) {
      case 'difficulty':
        dialog = document.getElementsByTagName('dialog')[this.modals[0].num];
        break;
      case 'progress':
        dialog = document.getElementsByTagName('dialog')[this.modals[1].num];
        break;
      case 'theme':
        dialog = document.getElementsByTagName('dialog')[this.modals[2].num];
        break;
      case 'duration':
        dialog = document.getElementsByTagName('dialog')[this.modals[3].num];
        break;
      default:
        return;
    }
    dialog.showModal();
  }

  // async openDifficultyFilter() {
  //   const { value: difficulty } = await Swal.fire({
  //     title: 'Sélectionnez la difficulté',
  //     input: 'select',
  //     inputOptions: {
  //       Facile: 'Facile',
  //       Moyen: 'Moyen',
  //       Difficile: 'Difficile',
  //     },
  //     showCancelButton: true,
  //   });

  //   if (difficulty) {
  //     this.selectedDifficulty = difficulty;
  //     this.currentPage = 1;
  //     this.filterQuizzes();
  //   }
  // }

  // async openDoneFilter() {
  //   const { value: done } = await Swal.fire({
  //     title: 'Sélectionnez le statut',
  //     input: 'select',
  //     inputOptions: {
  //       Fait: 'Fait',
  //       'Non fait': 'Non fait',
  //     },
  //     showCancelButton: true,
  //   });

  //   if (done) {
  //     this.selectedDone = done;
  //     this.currentPage = 1;
  //     this.filterQuizzes();
  //   }
  // }

  // async openThemeFilter() {
  //   const inputOptions = {};
  //   this.themes.forEach((theme) => {
  //     inputOptions[theme] = theme;
  //   });

  //   const { value: theme } = await Swal.fire({
  //     title: 'Sélectionnez le thème',
  //     input: 'select',
  //     inputOptions: inputOptions,
  //     showCancelButton: true,
  //   });

  //   if (theme) {
  //     this.selectedTheme = inputOptions[theme];
  //     this.currentPage = 1;
  //     this.filterQuizzes();
  //   }
  // }

  // async openDurationFilter() {
  //   const { value: duration } = await Swal.fire({
  //     title: 'Sélectionnez la durée',
  //     input: 'select',
  //     inputOptions: {
  //       '< 5 min': '< 5 min',
  //       '5 min < 10 min': '5 min < 10 min',
  //       '> 10 min': '> 10 min',
  //     },
  //     showCancelButton: true,
  //   });

  //   if (duration) {
  //     this.selectedDuration = duration;
  //     this.currentPage = 1;
  //     this.filterQuizzes();
  //   }
  // }
}
