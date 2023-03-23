import { Answer } from "./answer.mock";
import { Question } from "./question.mock";
import { Quiz } from "./quiz.mock";
import { Theme } from "./theme.mock";
export const QUIZ_LIST: Quiz[] = [
  new Quiz(
    1,
    "Les capitales européennes",
    1,
    "https://edoc.coe.int/10944/map-of-the-council-of-europe-46-member-states.jpg",
    "Bienvenue au jeu de quiz sur les capitales européennes ! Testez vos connaissances sur les villes capitales, gagnez des points pour chaque bonne réponse et devenez le vainqueur. Parfait pour les amateurs de géographie, voyages et histoire. Jouez dès maintenant !",
    15,
    new Theme(1, "Europe", "https://thumbs.dreamstime.com/b/placez-des-symboles-de-g%C3%A9ographie-%C3%A9quipements-pour-banni%C3%A8res-web-croquis-d-ensemble-cru-gribouillez-le-type-%C3%A9ducation-136641038.jpg"),
    [
      new Question(
        1,
        1,
        "La ville du Vatican, capital du Vatican, a le taux de crime le plus faible au monde",
        1,
        [
          new Answer(1, 1, "Vrai"),
          new Answer(2, 1, "False"),
        ]
      ),
      new Question(
        2,
        1,
        "Comment il s'appelle la capitale de Pologne?",
        1,
        [
          new Answer(3, 2, "Paris"),
          new Answer(4, 2, "Varsovie"),
          new Answer(5, 2, "Bretagne"),
          new Answer(6, 2, "Mazovie")
        ],
        "https://www.contrepoints.org/wp-content/uploads/2023/03/pologne-Photo-by-Elijah-G-on-Unsplash-e1678455293592-1200x800.jpg",
      ),
      new Question(
        3,
        1,
        "Quel est le symbôle de Paris?",
        2,
        [
          new Answer(7, 3,"", "https://www.planetware.com/wpimages/2021/02/france-paris-top-attractions-arc-de-triomphe.jpg"),
          new Answer(8, 3,"", "https://www.touropia.com/gfx/b/2013/02/sacre_coeur.jpg"),
          new Answer(9, 3,"", "https://www.planetware.com/photos-large/F/france-paris-eiffel-tower.jpg"),
          new Answer(10, 3,"", "https://www.planetware.com/wpimages/2022/02/france-paris-top-tourist-attractions-musee-du-louvre.jpg")
        ]
      )
    ]
  )
]

