import {TYPE_MULTIPLE_CHOICE} from "@/components/helpers/constants";

export default class Question {
    constructor(id, question, type, answers,image='',isRequired = false) {
        this.id = id
        this.question = question
        this.type = type
        this.answers = answers
        this.image = image
        this.isRequired = isRequired
    }

    static create(obj) {
        const question = new Question()
        for (const key in obj) {
            question[key] = obj[key];
        }
        return question;
    }

    static getDefaultQuestion() {
        return new Question(
            1,
            '',
            TYPE_MULTIPLE_CHOICE,
            [{id: 1, title: 'option 1'}])
    }

    copy() {
        return new Question(
            this.id,
            this.question,
            this.type,
            [...this.answers]
        )
    }

    getAnswerById() {

    }

}