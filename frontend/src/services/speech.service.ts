import { Injectable, EventEmitter } from '@angular/core';
import { SettingService } from './settings.service';

declare let webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  recognition: any = webkitSpeechRecognition;
  speech: EventEmitter<string> = new EventEmitter();
  private isStopped = false;
  private userSettings: any;
  private settingsSubscription: any;

  constructor(private settingsService: SettingService) {
    this.recognition = new webkitSpeechRecognition();

    this.settingsService.setCurrentUserSettings().then(() => {
      this.settingsSubscription = this.settingsService.settings$.subscribe(
        (settings) => {
          this.userSettings = settings;
        }
      );
    });

    if (this.recognition) {
      this.recognition.lang = 'fr-FR';
      this.recognition.continuous = true;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          console.log(transcript);
          this.speech.emit(transcript);
        }
      };

      this.recognition.onerror = (error) => {
        if (error.error !== 'no-speech') {
          console.log('Error occurred in recognition: ' + error.error);
        }
      };

      this.restartRecognitionOnEnd();
    }
  }

  public restart(): void {
    this.stopRecognition();
    try {
      this.startRecognition();
    } catch (error) {
      console.warn('Tout va bien tqt');
    }
  }

  startRecognition(): void {
    if (this.userSettings && this.userSettings.microphone) {
      this.recognition.interimResults = true;
    }
    this.isStopped = false;
    this.recognition?.start();
  }

  stopRecognition(): void {
    this.isStopped = true;
    this.recognition?.stop();
  }

  private restartRecognitionOnEnd() {
    this.recognition.onend = () => {
      if (!this.isStopped) {
        this.startRecognition();
      }
    };
  }
}
