export interface Stats {
  //created along with Result everytime a user plays a quiz
  id: number;
  user_id: number;
  quiz_id: number;
  average_time_per_question: number; //moyenne des temps de jeu
  nb_error_clics: number;
}
