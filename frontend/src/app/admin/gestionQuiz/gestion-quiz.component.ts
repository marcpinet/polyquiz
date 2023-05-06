import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gestion-quiz',
  templateUrl: './gestion-quiz.component.html',
})
export class GestionQuizComponent {
  constructor(private router: Router) {}

  navigateQuiz() {
    this.router.navigate(['/admin/quiz']);
  }

  navigateTheme() {
    this.router.navigate(['/admin/theme']);
  }
}
