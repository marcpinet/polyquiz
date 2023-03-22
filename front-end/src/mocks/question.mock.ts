

export class Question {
    question: string;
    answers: string[];
    goodAnswer: number;

    constructor(question: string, answers: string[], goodAnswer: number) {
        this.question = question;
        this.answers = answers;
        this.goodAnswer = goodAnswer;
    }
}
