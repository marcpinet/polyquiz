import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/models/quiz.model';
import { GamePageComponent } from '../game-page/game-page.component';
@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
})
export class GameQuestionComponent implements OnInit {
  answerSelected = -1;
  goodAnswer: string;
  @Input()
  question: Question;
  @Output()
  selectAnswer = new EventEmitter<number>();

  constructor() {
    this.question = {} as Question;
  }

  ngOnInit(): void {
    this.updateGoodAnswer();
  }

  updateGoodAnswer() {
    this.goodAnswer = this.question.answers.find(
      (answer) => answer.isCorrect
    ).answer_text;
  }



  checkAnswer(answer: number) {
    this.answerSelected = answer;
  }

  nextQuestion() {
    this.selectAnswer.emit(this.answerSelected);
    this.answerSelected = -1;
    this.updateGoodAnswer();
  }

}
