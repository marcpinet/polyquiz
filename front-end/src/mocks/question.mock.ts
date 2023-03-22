import { Answer } from "./answer.mock";
export class Question {
  id: number;
  quiz_id: number;
  question_text: string;
  correct_answer:number;
  answers: Answer[];
  question_image?: string;
  question_sound?: string;

  constructor(
    id: number,
    quiz_id: number,
    question_text: string,
    correct_answer:number,
    answers: Answer[],
    question_image?: string,
    question_sound?: string
  ) {
    this.id = id;
    this.quiz_id = quiz_id;
    this.question_text = question_text;
    this.correct_answer = correct_answer;
    this.answers = answers;
    this.question_image = question_image;
    this.question_sound = question_sound;
  }
}
