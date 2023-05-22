import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/models/quiz.model';
import { GamePageComponent } from '../game-page/game-page.component';
import { writtenNumber } from 'written-number';
import { Subscription } from 'rxjs';
import { SettingService } from 'src/services/settings.service';
import Swal from 'sweetalert2';
import { Settings } from 'src/models/settings.model';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss'],
})
export class GameQuestionComponent implements OnInit {
  // audioObjR: HTMLAudioElement = new Audio();
  // audioObjW: HTMLAudioElement = new Audio();
  answerSelected = -1;
  microphoneActivated = false;
  quizInProgress = false;
  buttonStates: boolean[] = [false, false, false, false];
  private userSettings: Settings;
  private settingsSubscription: Subscription;
  click_error = 0;

  @Input()
  question: Question;
  @Output()
  selectAnswer = new EventEmitter<number>();
  @Output()
  clickError = new EventEmitter<number>();

  constructor(private settingsService: SettingService) {
    this.question = {} as Question;
    // this.audioObjR.src = '../../assets/sounds/right_answer.mp3';
    // this.audioObjW.src = '../../assets/sounds/wrong_answer.mp3';
    this.settingsService.setCurrentUserSettings().then(() => {
      this.settingsSubscription = this.settingsService.settings$.subscribe(
        (settings) => {
          this.userSettings = settings;
        }
      );
    });
  }

  ngOnInit(): void {}

  // playAudio() {
  //   if (this.userSettings && !this.userSettings.sound_effect) return;

  //   const correctAnswerIndex = this.question.answers?.findIndex(
  //     (answer) => answer.isCorrect
  //   );

  //   if (this.answerSelected === -1) return;

  //   if (correctAnswerIndex && this.answerSelected === correctAnswerIndex) {
  //     this.audioObjR.load();
  //     this.audioObjR.play();
  //   } else {
  //     this.audioObjW.load();
  //     this.audioObjW.play();
  //   }
  // }

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

  selectAnswerClick(answer: number) {
    this.buttonStates[answer] = true;
    setTimeout(() => {
      if (this.userSettings.confirm_answer) {
        let htmlTxt = `<h1 class="text-6xl text-[#2B3467] font-bold mb-4">Vous voulez choisir ${this.question.answers[answer].answer_text} ?</h1>`;
        if (this.question.answers[answer].answer_image) {
          htmlTxt += `<img src="${this.question.answers[answer].answer_image}" class="w-1/2 mx-auto">`;
        }
        Swal.fire({
          html: htmlTxt,
          showDenyButton: true,
          showCancelButton: false,
          width: 1700,
          padding: '4em',
          confirmButtonText:
            '<span id="oui" style="font-size: 150px; padding: 150px 150px; ">Oui</span>',
          denyButtonText:
            '<span id="non" style="font-size: 150px; padding: 150px 150px;">Non</span>', // add non-breaking spaces between span tags to create more space between buttons
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              title: 'Votre réponse a été enregistrée',
              showConfirmButton: false,
              timer: 1500,
            });
            this.answerSelected = answer;
            //this.playAudio();
          } else if (result.isDenied) {
            this.click_error++;
            this.clickError.emit(this.click_error);
            Swal.fire({
              icon: 'info',
              title: "La réponse n'a pas été enregistrée",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      } else {
        this.answerSelected = answer;
        //this.playAudio();
      }
      this.buttonStates[answer] = false;
      this.quizInProgress = false;
    }, 1500);
  }

  protected normalizeText(text: string): string {
    const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ';
    const noAccents = 'AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNn';
    const wordsToRemove = [];
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
      .join('_')
      .replace(/_{2,}/g, '_'); // Remove consecutive underscores;
    return newText;
  }

  @HostListener('document:click', ['$event'])
  documentClickHandler(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const isClickableElement =
      this.isClickableOrContainsClickable(clickedElement);

    if (!isClickableElement) {
      this.click_error++;
      this.clickError.emit(this.click_error);
    }
  }

  isClickableOrContainsClickable(element: HTMLElement | null): boolean {
    const clickableDataNumbers = ['un', 'deux', 'trois', 'quatre'];

    if (!element) {
      return false;
    }

    if (
      clickableDataNumbers.includes(
        element.getAttribute('data-number') || ''
      ) ||
      element.id === 'suivant'
    ) {
      return true;
    }

    return this.isClickableOrContainsClickable(element.parentElement);
  }

  blockClick() {
    console.log('Krysto');
    this.quizInProgress = true;
    //const answerDivs = document.querySelectorAll('.flex-1.h-full');
    //answerDivs.forEach((div: HTMLDivElement) => {
    //console.log("DIV");
    //div.classList.add('disabled');
    // });
  }
}
