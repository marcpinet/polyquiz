import { asNativeElements, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Quiz} from '../../../models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { GameQuestionComponent } from '../game-question/game-question.component';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {

    quiz: Quiz | undefined;
    score = 0;
    compteur = 0;
    answerSelected = false;
    selectedAnswer : string | undefined;
    answerGood = false;

    constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService){
      this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    }

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.quizService.setSelectedQuiz(Number(id));
      this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    }


    checkAnswer(answer: number){
        this.score = answer;
        this.answerSelected = true;
        this.selectedAnswer = this.quiz.questions[this.compteur].answers[answer].answer_text;
        this.answerGood = this.quiz.questions[this.compteur].correct_answer == answer;
        this.nextQuestion();
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
