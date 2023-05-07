import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
@Component({
  selector: 'app-quiz-list-admin',
  templateUrl: './quiz-list.component.html',
})
export class QuizListAdminComponent {
  public quizList: Quiz[] = [];
  constructor(public router: Router, public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizzes) => {
      this.quizList = quizzes;
    });
  }

  navigateQuizModif(quizId: string) {
    this.router.navigate(['/admin/quiz/modif/' + quizId]);
  }
}
