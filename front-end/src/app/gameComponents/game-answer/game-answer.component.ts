import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer } from '../../../models/quiz.model';


@Component({
  selector: 'app-game-answer',
  templateUrl: './game-answer.component.html',
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
