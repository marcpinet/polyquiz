import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Quiz } from "../mocks/quiz.mock";
import { QUIZ_LIST } from "../mocks/quizlist.mock";

@Injectable({
    providedIn: 'root'
  })
  export class QuizListService {
    private quizzes: Quiz[] = QUIZ_LIST;
    public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  }
