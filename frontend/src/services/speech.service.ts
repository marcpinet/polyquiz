import { Injectable, EventEmitter } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  recognition: any = webkitSpeechRecognition;
  letterADetected: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.recognition = new webkitSpeechRecognition();

    if (this.recognition) {
      this.recognition.lang = 'fr-FR';
      this.recognition.continuous = true;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          this.letterADetected.emit(transcript);
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
