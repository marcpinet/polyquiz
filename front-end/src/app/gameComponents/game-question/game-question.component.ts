import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/mocks/question.mock';
import { Quiz } from 'src/mocks/quiz.mock';
import { QUIZ_LIST } from 'src/mocks/quizlist.mock';
import { QuizListService } from 'src/services/quizlist-service.service';
import { GamePageComponent } from '../game-page/game-page.component';

@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss'],
})
export class GameQuestionComponent{
  
  answerSelected = -1;

    @Input()
    question: Question;
    @Output()
    selectAnswer = new EventEmitter<number>();

    

    constructor(){
      this.question = {} as Question;
    }

    checkAnswer(answer: number){
        this.answerSelected = answer;
    } 

    nextQuestion(){
      let ans = this.answerSelected;
      this.answerSelected = -1;
      this.selectAnswer.emit(ans);
    }
}
