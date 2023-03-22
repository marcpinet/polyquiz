
//Export the quiz class

import { Question } from "./question.mock";

export class Quiz {
    id: string;
    img: string;
    name: string ;
    theme: string;
    questions: Question[] ;

    constructor(id: string, img:string, name: string, theme: string, questions: Question[]) {
        this.id = id;
        this.img = img;
        this.name = name;
        this.theme = theme;
        this.questions = questions;
    }
}


