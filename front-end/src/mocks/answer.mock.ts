export class Answer {
  id: number;
  question_id: number;
  answer_text?: string;
  answer_image?: string;

  constructor(
    id: number,
    question_id: number,
    answer_text?: string,
    answer_image?: string,
  ) {
    this.id = id;
    this.question_id = question_id;
    this.answer_text = answer_text;
    this.answer_image = answer_image;
  }
}
