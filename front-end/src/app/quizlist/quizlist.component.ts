import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/mocks/quiz.mock';
import { QuizDetailsComponent } from './child/child.component';
import { QuizListService } from 'src/services/quizlist-service.service';

@Component({
  selector: 'quizlist',
  templateUrl: './quizlist.component.html',
  styleUrls: ['./quizlist.component.scss'],
})
export class QuizListComponent implements OnInit {
  quizList: Quiz[] = [];

  constructor(private quizService: QuizListService) {}

  ngOnInit(): void {
    this.quizService.quizzes$.subscribe((quizList: Quiz[]) => {
      this.quizList = quizList;
    });
  }
}
