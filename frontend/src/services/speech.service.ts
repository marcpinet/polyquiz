import { Injectable, EventEmitter } from '@angular/core';

declare let webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  recognition: any = webkitSpeechRecognition;
  speech: EventEmitter<string> = new EventEmitter();
  private isStopped = false; // Ajoutez cette variable

  constructor() {
    this.recognition = new webkitSpeechRecognition();

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

  startRecognition(): void {
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
