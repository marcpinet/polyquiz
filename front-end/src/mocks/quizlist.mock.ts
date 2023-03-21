import { Quiz } from "./quiz.mock";

export const QUIZ_LIST: Quiz[] = [
  {
    id: '1',
    img: '../assets/img/placeholder.png',
    name: 'Les Acteurs',
    theme: 'Actor',
    questions: [{question: "Question 1", answers: ["Réponse 1", "Réponse 2", "Réponse 3", "Réponse 4"], goodAnswer: 0},
                {question: "Question 2", answers: ["Réponse 5", "Réponse 6", "Réponse 7", "Réponse 8"], goodAnswer: 1},
                {question: "Question 3", answers: ["Réponse 9", "Réponse 10", "Réponse 11", "Réponse 12"], goodAnswer: 2},
                {question: "Question 4", answers: ["Réponse 13", "Réponse 14", "Réponse 15", "Réponse 16"], goodAnswer: 3}]
  },
  {
    id: '2',
    img: '../assets/img/placeholder.png',
    name: 'Les technos WEB',
    theme: 'Technologies',
    questions: [{question: "Question 1", answers: ["Réponse 1", "Réponse 2", "Réponse 3", "Réponse 4"], goodAnswer: 1},
                {question: "Question 2", answers: ["Réponse 1", "Réponse 2", "Réponse 3", "Réponse 4"], goodAnswer: 1}]
  }
];