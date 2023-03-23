import { Question } from "src/models/quiz.model";
import { Theme } from "./theme.mock";
export class Quiz {
  id: number;
  name: string;
  level: number;
  image: string;
  description: string;
  estimated_time: number;
  theme:Theme;
  questions: Question[];
  constructor(id: number, name: string, level: number, image: string, description: string, estimated_time: number, theme: Theme, questions: Question[]) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.image = image;
    this.description = description;
    this.estimated_time = estimated_time;
    this.theme=theme;
    this.questions = questions;
  }
}
