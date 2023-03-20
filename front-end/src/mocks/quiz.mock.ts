
//Export the quiz class

export class Quiz {
    id: string;
    img: string;
    name: string ;
    theme: string;
    questions: string[] ;

    constructor(id: string, img:string, name: string, theme: string, questions: string[]) {
        this.id = id;
        this.img = img;
        this.name = name;
        this.theme = theme;
        this.questions = questions;
    }
}


