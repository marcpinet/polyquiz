import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from 'src/models/result-quiz.model';
import { ResultService } from 'src/services/result.service';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
})
export class ResultComponent implements OnInit {
  correct_answers: number = 8;
  incorrect_answers = 2;
  score: number =
    (this.correct_answers / (this.correct_answers + this.incorrect_answers)) *
    100;
  total_time = 10;
  average_time = 1;
  result: Result;
  quiz: Quiz;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resultService: ResultService,
    private quizService: QuizService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.resultService.setSelectedResult(id);
    this.resultService.resultSelected$.subscribe((result) => {
      this.result = result;
      this.quizService.setSelectedQuiz(result.quiz_id);
      this.quizService.quizSelected$.subscribe((quiz) => (this.quiz = quiz));
    });
  }

  ngOnInit() {}

  compilTime(time: number) {
    var tmp = '';
    if (time > 60) {
      tmp += Math.floor(time / 60) + 'm';
    }
    tmp += (time % 60).toFixed(2) + 's';
    return tmp;
  }

  replay() {
    this.router.navigate(['/game/' + this.result.quiz_id]);
  }
}
