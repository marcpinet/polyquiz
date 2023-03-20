import { Quiz } from "./quiz.mock";

export const QUIZ_LIST: Quiz[] = [
  {
    id: '1',
    img: '../assets/img/placeholder.png',
    name: 'Les Acteurs',
    theme: 'Actor',
    questions: [{question: "Question 1", answers: ["Réponse 1", "Réponse 2", "Réponse 3", "Réponse 4"]},
                {question: "Question 2", answers: ["Réponse 1", "Réponse 2", "Réponse 3", "Réponse 4"]}]
  },
  {
    id: '2',
    img: '../assets/img/placeholder.png',
    name: 'Les technos WEB',
    theme: 'Technologies',
    questions: [{question: "Question 1", answers: ["Réponse 1", "Réponse 2", "Réponse 3", "Réponse 4"]},
                {question: "Question 2", answers: ["Réponse 1", "Réponse 2", "Réponse 3", "Réponse 4"]}]
  }
];