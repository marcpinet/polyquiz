import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Quiz } from 'src/models/quiz.model';
@Component({
  selector: 'app-played-quiz',
  templateUrl: './played-quiz.component.html',
})
export class PlayedQuizComponent implements OnInit {
  quiz: Quiz;
  constructor(private authService: AuthService) {}

  ngOnInit() {}
}
