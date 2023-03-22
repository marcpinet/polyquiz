export interface Quiz {
  id: number;
  name: string;
  level: number;
  description: string;
  estimated_time: number;
}

export interface Question {
  id: number;
  quiz_id: number;
  question_text: string;
  question_image?: string;
  question_sound?: string;
  correct_answer: number;
}

export interface Answer {
  id: number;
  question_id: number;
  answer_text?: string;
  answer_image?: string;
}
