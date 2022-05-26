import {createStore} from 'vuex'
import {createCommentVNode} from "vue";
import Helpers from "@/components/helpers/helpers.js";

export default createStore({
    state: {
        formTitle: "Untitled",
        questions: []
    },
    getters: {
        getQuestions(state) {
            return state.questions
        },
        getQuestionById(state, id) {
            let i = state.questions.find(question => question.id === id)
            debugger
            return i
        }
    },
    mutations: {
        addToQuestions(state, question) {
            state.questions.push(question)
            console.log(state.questions)
        },
        addOptions(state, {question, option}) {
            let questionIndex = state.questions.findIndex(item => question.id === item.id)
            state.questions[questionIndex].answers.push(option)
            console.log(state.questions[questionIndex])
        },
        updateQuestion(state, {questionId, title}) {
            let questionIndex = state.questions.findIndex(question => questionId === question.id)
            state.questions[questionIndex].question = title
            console.log(state.questions[questionIndex])
        },
        updateOption(state, {questionID, optionID, title}) {
            let questionIndex = state.questions.findIndex(question => questionID === question.id)
            let optionIndex = Helpers.findIndexById(optionID,state.questions[questionIndex].answers)
            state.questions[questionIndex].answers[optionIndex].title = title
            console.log(state.questions[questionIndex].answers)
        },

    },
    actions: {
        addToQuestions({commit}, question) {
            commit('addToQuestions', question)
        },
        addOptions({commit}, {question, option}) {
            commit('addOptions', {question, option})
        },
        updateQuestion({commit}, {questionId, title}) {
            commit('updateQuestion', {questionId, title})
        },
        updateOption({commit}, {questionID, optionID, title}){
            commit("updateOption",{questionID, optionID, title})
        }
    },
})
