import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer } from 'src/mocks/answer.mock';
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
    answer: Answer;
    @Input()
    letter: string;
    @Output()
    selectAnswer = new EventEmitter<number>();

    constructor(){
        this.answer = {} as Answer;
        this.letter = "";
    }



}
