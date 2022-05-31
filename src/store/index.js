import {createStore} from 'vuex'
import Helpers from "@/components/helpers/helpers.js";

export default createStore({
    state: {
        formTitle: "Untitled",
        questions: []
    },
    getters: {
        getQuestionById(state, id) {
            let i = state.questions.find(question => question.id === id)
            debugger
            return i
        }
    },
    mutations: {
        addToQuestions(state, question) {
            question.id = Helpers.getID(state.questions)
            // question.answers = [...question.answers]
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
        removeQuestion(state, questionID) {
            state.questions = state.questions.filter(item => item.id !== questionID)
        },
        updateOption(state, {questionID, optionID, title}) {
            let questionIndex = state.questions.findIndex(question => questionID === question.id)
            let optionIndex = Helpers.findIndexById(optionID, state.questions[questionIndex].answers)
            state.questions[questionIndex].answers[optionIndex].title = title
            console.log(state.questions[questionIndex].answers)
        },
        updateType(state, {questionID, type}) {
            let questionIndex = Helpers.findIndexById(questionID, state.questions)
            state.questions[questionIndex].type = type
        },
        removeOption(state, {questionID, optionID}) {
            let index = Helpers.findIndexById(questionID, state.questions)
            const question = state.questions[index]
            question.answers = question.answers.filter(item => item.id !== optionID)
            state.questions[index] = {...question}
        }
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
        updateOption({commit}, {questionID, optionID, title}) {
            commit("updateOption", {questionID, optionID, title})
        },
        updateType({commit}, {questionID, type}) {
            commit("updateType", {questionID, type})
        },
        removeQuestion({commit}, questionID) {
            commit("removeQuestion", questionID)
        },
        removeOption({commit}, {questionID, optionID}) {
            commit('removeOption', {questionID, optionID})
        }
    },
})
