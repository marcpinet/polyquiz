export interface Quiz {
  id: string;
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
  id: string;
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
  id: string;
  name: string;
  image: number;
}
