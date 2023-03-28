export interface Quiz {
  id: number;
  name: string;
  difficulty: string;
  image: string;
  description: string;
  estimated_time: number;
  themeId: number;
  theme?: Theme
  questions: Question[];
}

export interface Question {
  id: number;
  quizId: number;
  question_text: string;
  question_image?: string;
  question_sound?: string;
  explain_text: string;
  explain_image?: string;
  answers: Answer[];
}

export interface Answer {
  isCorrect: boolean;
  answer_text?: string;
  answer_image?: string;
}

export interface Theme {
  id: number;
  name: string;
  image: number;
}
