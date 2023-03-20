import { Component, HostListener, Input } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Quiz } from '../../../mocks/quiz.mock';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent {

  @Input()
  quiz: Quiz;

  constructor() { 
    this.quiz = new Quiz('','','','',[]);
  }

  onClick(){
  }

  
  
}
