import { Question } from "src/models/quiz.model";
export class Quiz {
  id: number;
  name: string;
  level: number;
  description: string;
  estimated_time: number;
  questions: Question[];
  constructor(id: number, name: string, level: number, description: string, estimated_time: number, questions: Question[]) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.description = description;
    this.estimated_time = estimated_time;
    this.questions = questions;
  }
}
