import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-carousel',
  templateUrl: './quiz-carousel.component.html',
  styleUrls: ['./quiz-carousel.component.css'],
})
export class QuizCarousel implements OnInit {
  public quizList: Quiz[] = [];

  constructor(private router: Router, public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit(): void {}

  navigateQuizList() {
    this.router.navigate(['/quizlist']);
  }
}
