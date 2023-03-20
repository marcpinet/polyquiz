import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from 'src/mocks/quiz.mock';
import { QUIZ_LIST } from 'src/mocks/quizlist.mock';
import { QuizListService } from 'src/services/quizlist-service.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent{
    
    @Input()
    quiz: Quiz = QUIZ_LIST[0] ;

    compteur = 0;

    constructor(){}

    onClick(answer: String){
        this.compteur++;
    }

    function(answer: string){
        this.compteur++;
    }


}
