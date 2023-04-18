import { Injectable, EventEmitter } from '@angular/core';

declare let webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  recognition: any = webkitSpeechRecognition;
  speech: EventEmitter<string> = new EventEmitter();

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
        console.error('Recognition error:', error.error);
      };
    }
  }

  startRecognition(): void {
    this.recognition?.start();
  }

  stopRecognition(): void {
    this.recognition?.stop();
  }
}
