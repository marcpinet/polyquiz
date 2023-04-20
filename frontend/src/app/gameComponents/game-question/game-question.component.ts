import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/models/quiz.model';
import { GamePageComponent } from '../game-page/game-page.component';
import { SettingService } from 'src/services/settings.service';
import { writtenNumber } from 'written-number';

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

  protected normalizeText(text: string): string {
    const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ';
    const noAccents = 'AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNn';
    const wordsToRemove = ['le', 'la', 'les', 'de', 'des'];
    const newText = text
      .trim()
      .replace(/\d+/g, (match) =>
        writtenNumber(parseInt(match), { lang: 'fr' })
      )
      .split('')
      .map((char) => {
        const index = accents.indexOf(char);
        return index !== -1 ? noAccents[index] : char;
      })
      .join('')
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '_')
      .split('_')
      .filter((word) => !wordsToRemove.includes(word))
      .join('_');
    return newText;
  }
}
