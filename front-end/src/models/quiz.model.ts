export interface Quiz {
  id: number;
  name: string;
  difficulty: string;
  image: string;
  description: string;
  estimated_time: number;
  theme_id: number;
}

export interface Question {
  id: number;
  quiz_id: number;
  question_text: string;
  question_image?: string;
  question_sound?: string;
  correct_answer: number;
  explain_text: string;
  explain_image?: string;
}

export interface Answer {
  id: number;
  question_id: number;
  answer_text?: string;
  answer_image?: string;
}

export interface Theme {
  id: number;
  name: string;
  image: number;
}
