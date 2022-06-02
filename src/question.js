import {TYPE_MULTIPLE_CHOICE} from "@/components/helpers/constants";

export default class Question {
    constructor(id, question, type, answers) {
        this.id = id
        this.question = question
        this.type = type
        this.answers = answers
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
}