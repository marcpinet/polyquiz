
//Export the quiz class

export class Quiz {
    id: string;
    name: string ;
    theme: string;
    questions: string[] ;

    constructor(id: string, name: string, theme: string, questions: string[]) {
        this.id = id;
        this.name = name;
        this.theme = theme;
        this.questions = questions;
    }
}


