import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizzes-admin',
  templateUrl: './quizzes.component.html',
})
export class QuizzesAdminComponent {
  constructor(private router: Router) {}
  navigateAddQuiz() {
    this.router.navigate(['/admin/quiz/add']);
  }
}
