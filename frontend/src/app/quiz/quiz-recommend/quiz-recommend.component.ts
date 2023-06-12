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
  selector: 'quiz-recommend',
  templateUrl: './quiz-recommend.component.html',
  styleUrls: ['./quiz-recommend.component.scss'],
})
export class QuizRecommendComponent implements OnInit {
  public quizList: Quiz[] = [];
  public playedQuizIds: string[] = [];
  public user: User;
  public filteredQuizList: Quiz[] = [];
  public currentPage: number = 1;
  public pageSize: number = 3;

  constructor(
    private router: Router,
    public quizService: QuizService,
    private themeService: ThemesService,
    private authService: AuthService,
    private resultService: ResultService
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.resultService.getResultsByUser(user).subscribe((results) => {
        this.playedQuizIds = results.map((result) => result.quiz_id);
        this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
          this.quizList = this.sortQuizList(quizzes);
          this.filteredQuizList = [...this.quizList];
        });
      });
    });
  }

  sortQuizList(quizzes: Quiz[]): Quiz[] {
    //sort quiz based by not played yet -> played already long time ago -> played recently
    quizzes.sort((a, b) => {
      if (this.hasPlayedQuiz(a.id) && this.hasPlayedQuiz(b.id)) {
        return (
          this.getQuizLastPlayedDate(b.id).getTime() -
          this.getQuizLastPlayedDate(a.id).getTime()
        );
      } else if (this.hasPlayedQuiz(a.id)) {
        return 1;
      } else if (this.hasPlayedQuiz(b.id)) {
        return -1;
      } else {
        return 0;
      }
    });
    return quizzes;
  }

  getQuizLastPlayedDate(quizId: string): Date {
    this.resultService.getResultsByQuiz(quizId).subscribe((results) => {
      if (results.length > 0) {
        return results[results.length - 1].date;
      } else {
        return new Date(0);
      }
    });
    return new Date(0);
  }

  hasPlayedQuiz(quizId: string): boolean {
    return this.playedQuizIds.includes(quizId);
  }

  filterQuizzes(): void {
    this.filteredQuizList = this.quizList;
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

  ngOnInit(): void {}
}
