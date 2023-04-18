import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SpeechService } from '../services/speech.service';
import { SettingService } from '../services/settings.service';
import { Subscription } from 'rxjs';
import { Settings } from 'src/models/settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private settingsSubscription: Subscription;
  private speechSubscription: Subscription;

  constructor(
    public router: Router,
    private speechService: SpeechService,
    private settingsService: SettingService
  ) {
    this.settingsService.setCurrentUserSettings().then(() => {
      this.settingsSubscription = this.settingsService.settings$.subscribe(
        (settings) => {
          this.handleSpeechRecognition(settings);
        }
      );
    });
    this.speechSubscription = this.speechService.speech.subscribe(
      (transcript) => {
        this.handleClickBySpeech(transcript);
      }
    );
  }

  ngOnDestroy() {
    this.settingsSubscription.unsubscribe();
    this.speechSubscription.unsubscribe();
  }

  private handleSpeechRecognition(settings: Settings) {
    if (settings && settings.microphone) {
      this.speechService.startRecognition();
    } else {
      this.speechService.stopRecognition();
    }
  }

  /* Parsing du texte dit par l'utilisateur NE PAS TOUCHER SVP */
  private normalizeText(text: string): string {
    const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ';
    const noAccents = 'AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNn';
    const newText = text
      .split('')
      .map((char) => {
        const index = accents.indexOf(char);
        return index !== -1 ? noAccents[index] : char;
      })
      .join('')
      .replace(/\s+/g, '_');
    return newText;
  }

  private handleClickBySpeech(transcript: string) {
    const wordsToRemove = ['le', 'la', 'les', 'de', 'des'];
    const normalizedTranscript = this.normalizeText(transcript);
    const words = normalizedTranscript
      .split('_')
      .filter((word) => !wordsToRemove.includes(word));
    const combinations = this.generateCombinations(words);

    for (const combination of combinations) {
      if (this.findAndClickButton([combination])) {
        return;
      }
    }

    console.warn('Aucun bouton trouvé pour les mots du transcript');
  }

  private generateCombinations(arr: string[]): string[] {
    const result: string[] = [];

    const generate = (n: number, prefix: string) => {
      if (n === 0) {
        result.push(prefix);
        return;
      }

      for (const element of arr) {
        generate(n - 1, prefix + (prefix.length > 0 ? '_' : '') + element);
      }
    };

    for (let i = 1; i <= arr.length; i++) {
      generate(i, '');
    }

    return result;
  }

  private findAndClickButton(words: string[]): boolean {
    for (const word of words) {
      if (word && word.length > 0 && word[0] !== '#') {
        const buttonElement = document.querySelector(`#${word}`);

        if (buttonElement) {
          buttonElement.dispatchEvent(new MouseEvent('click'));
          return true;
        }
      }
    }

    return false;
  }
}
