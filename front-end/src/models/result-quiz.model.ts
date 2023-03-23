export interface Result { //Result of of quiz's play round
  id: number;
  user_id: number;
  quiz_id: number;
  right_answers: number;
  wrong_answers: number;
  score: number; //caculated based on right_answers and wrong_answers
  play_time: number;
}


