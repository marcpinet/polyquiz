import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/mocks/quiz.mock';
import { QuizListService } from 'src/services/quizlist-service.service';

@Component({
  selector: 'quizlist',
  templateUrl: './quizlist.component.html',
  styleUrls: ['./quizlist.component.scss'],
})
export class QuizListComponent implements OnInit {
  quizList: Quiz[] = [];
  listTitle = 'Quiz List';

  constructor(private quizService: QuizListService, private router: Router) {}

  ngOnInit(): void {
    this.quizService.quizzes$.subscribe((quizList: Quiz[]) => {
      this.quizList = quizList;
    });
  }
}
