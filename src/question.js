import Helpers from "@/components/helpers/helpers";

export default
class Question{
    constructor(id, question, type,answers) {
        this.id = id
        this.question = question
        this.type  = type
        this.answers = answers
    }
    static get defaultQuestion(){
        return new Question(
            1,
            '',
            'Multiple choice',
            [{id: 1, title: 'option 1'}])
    }
    copy(){
        return new Question(
            this.id,
            this.question,
            this.type,
            [...this.answers]
        )
    }
}