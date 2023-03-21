import { Component, HostListener, Input } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Quiz } from '../../../mocks/quiz.mock';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent {

  @Input()
  quiz: Quiz;

  constructor(private router: Router) { 
    this.quiz = new Quiz('','','','',[]);
  }

  onClick(){
    this.router.navigate(['/game', this.quiz.id]);
  }

  
  
}
