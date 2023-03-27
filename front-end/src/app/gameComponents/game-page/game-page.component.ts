import { asNativeElements, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {

    quiz: Quiz = QUIZ_LIST[0];

    score = 0;
    compteur = 0;
    answerSelected = false;
    selectedAnswer : string | undefined;
    answerGood = false;

    constructor(private router: Router, private route: ActivatedRoute){
    }

    ngOnInit(): void {
        const quiz = QUIZ_LIST.find(quiz => quiz.id == this.route.snapshot.params['quizId']);
        if(quiz != null){
            this.quiz = quiz
        }else {
            this.quiz = QUIZ_LIST[0];
        }
    }


    checkAnswer(answer: number){
        this.score = answer;
        this.answerSelected = true;
        this.selectedAnswer = this.quiz.questions[this.compteur].answers[answer].answer_text;
        this.answerGood = this.quiz.questions[this.compteur].correct_answer == answer;
    }

    updateScore(){
        if(this.answerGood){
            this.score++;
        }
    }

    nextQuestion(){
        this.updateScore();
        this.answerSelected = false;
        this.selectedAnswer = "";
        this.answerGood = false;
        this.compteur++;
    }

    endGame(){
        this.router.navigate(['/']);
    }



}
