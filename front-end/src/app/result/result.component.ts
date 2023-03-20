import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {

    score: number = 8;
    correct_answers: number = 8;
    incorrect_answers = 2;
    total_time = 10;
    average_time = 1;

    constructor() {
    }

    ngOnInit() {

    }



}