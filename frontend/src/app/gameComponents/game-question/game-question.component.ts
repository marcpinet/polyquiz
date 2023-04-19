import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/models/quiz.model';
import { GamePageComponent } from '../game-page/game-page.component';
import { SettingService } from 'src/services/settings.service';

@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
})
export class GameQuestionComponent implements OnInit {
  answerSelected = -1;
  microphoneActivated = false;
  @Input()
  question: Question;
  @Output()
  selectAnswer = new EventEmitter<number>();

  constructor(private settingService: SettingService) {
    this.question = {} as Question;
  }

  ngOnInit(): void {}

  get goodAnswer(): string | undefined {
    const correctAnswer = this.question.answers?.find(
      (answer) => answer.isCorrect
    );
    return correctAnswer ? correctAnswer.answer_text : undefined;
  }

  checkAnswer(answer: number) {
    this.answerSelected = answer;
  }

  nextQuestion() {
    this.selectAnswer.emit(this.answerSelected);
    this.answerSelected = -1;
  }
}
