export interface Result {
  //Result of of quiz's play round
  id: number;
  user_id: number;
  quiz_id: string;
  right_answers: number;
  wrong_answers: number;
  play_time: number;
  date: Date;
  time_per_question: number;
}
