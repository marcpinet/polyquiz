import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Router } from '@angular/router';
import {Theme } from 'src/models/quiz.model';
import { ThemesService } from 'src/services/theme.service';
@Component({
  selector: 'app-quiz-carousel',
  templateUrl: './quiz-carousel.component.html',
  styleUrls: ['./quiz-carousel.component.css']
})

export class QuizCarousel implements OnInit {
  public quizList: Quiz[] = [];
  public themeList: Theme[] = [];

  constructor(private router: Router, public quizService: QuizService, public themeService: ThemesService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });
  }


  ngOnInit(): void {
  }

  navigateQuizList(){
    this.router.navigate(['/quizlist']);
  }
}
