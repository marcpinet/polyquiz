import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/mocks/question.mock';
import { Quiz } from 'src/mocks/quiz.mock';
import { QUIZ_LIST } from 'src/mocks/quizlist.mock';
import { QuizListService } from 'src/services/quizlist-service.service';

@Component({
  selector: 'app-game-answer',
  templateUrl: './game-answer.component.html',
  styleUrls: ['./game-answer.component.scss'],
})
export class GameAnswerComponent{
    
    @Input()
    answer: string;

    constructor(){
        this.answer = "";
    }

    onClick(answer : string){
    }


}
