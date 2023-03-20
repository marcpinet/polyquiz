

export class Question {
    question: string;
    answers: string[];

    constructor(question: string, answers: string[]) {
        this.question = question;
        this.answers = answers;
    }
}
