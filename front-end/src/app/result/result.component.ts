import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {

    correct_answers: number = 8;
    incorrect_answers = 2;
    score: number = this.correct_answers / (this.correct_answers + this.incorrect_answers) * 100;
    total_time = 10;
    average_time = 1;

    constructor() {
    }

    ngOnInit() {

    }



}