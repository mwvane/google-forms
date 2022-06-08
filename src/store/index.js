import {createStore} from 'vuex'
import Helpers from "@/components/helpers/helpers.js";
import Question from "@/question";

export default createStore({
    state: {
        formTitle: "Untitled",
        questionnaire: [],
        currentQuestionnaire: null,
    },
    getters: {
        getQuestionById(state, id) {
            let i = state.questionnaire.find(question => question.id === id)
            return i
        }
    },
    mutations: {
        addNewQuestionnaire(state, questionnaire) {
            questionnaire.id = Helpers.getID(state.questionnaire)
            state.questionnaire.push(questionnaire)
            state.currentQuestionnaire = questionnaire
        },
        addToQuestionnaire(state, question) {
            question.id = Helpers.getID(state.currentQuestionnaire.questions)
            state.currentQuestionnaire.questions.push(question)
        },
        addOptions(state, {question, option}) {
            let questionIndex = state.currentQuestionnaire.questions.findIndex(item => question.id === item.id)
            state.currentQuestionnaire.questions[questionIndex].answers.push(option)
            console.log(state.currentQuestionnaire.questions)
        },
        updateQuestion(state, {questionId, title}) {
            let questionIndex = state.currentQuestionnaire.questions.findIndex(question => questionId === question.id)
            state.currentQuestionnaire.questions[questionIndex].question = title
        },
        removeQuestion(state, questionID) {
            state.currentQuestionnaire.questions = state.currentQuestionnaire.questions.filter(item => item.id !== questionID)
        },
        updateOption(state, {questionID, optionID, title}) {
            let questionIndex = state.currentQuestionnaire.questions.findIndex(question => questionID === question.id)
            let optionIndex = Helpers.findIndexById(optionID, state.currentQuestionnaire.questions[questionIndex].answers)
            state.currentQuestionnaire.questions[questionIndex].answers[optionIndex].title = title
        },
        updateType(state, {questionID, type}) {
            let questionIndex = Helpers.findIndexById(questionID, state.currentQuestionnaire.questions)
            state.currentQuestionnaire.questions[questionIndex].type = type
        },
        removeOption(state, {questionID, optionID}) {
            const index = Helpers.findIndexById(questionID, state.currentQuestionnaire.questions)
            const question = state.currentQuestionnaire.questions[index]
            question.answers = question.answers.filter(item => item.id !== optionID)
            state.currentQuestionnaire.questions = state.currentQuestionnaire.questions.map(question => question.copy())
        },
        removeAllOptions(state, questionID) {
            let index = Helpers.findIndexById(questionID, state.questions)
            state.questions[index].answers = []
            console.log(state.questions)
        },
        setCurrentQuestionnaire(state, id) {
            let index = state.questionnaire.findIndex(item => item.id === Number(id))
            state.currentQuestionnaire = state.questionnaire[index]
        },
        response(state, {questionnaireId, data}) {
            let index = Helpers.findIndexById(Number(questionnaireId), state.questionnaire)
            let response = {id: Helpers.getID(state.questionnaire[index].responses), data: data}
            state.questionnaire[index].responses.push(response
            )
            console.log(state.questionnaire[index])
        },
        removeResponse(state, {questionnaireId, responseId}) {
            let index = Helpers.findIndexById(Number(questionnaireId), state.questionnaire)
            state.questionnaire[index].responses = state.questionnaire[index].responses.filter(item => item.id !== Number(responseId))
        },
        saveToStorage(state){
            Helpers.saveToStorage('data', this.state.questionnaire)
        },
        readFromStorage(state){
            let data = Helpers.readFromStorage('data')
            if(data){
                state.questionnaire = data
            }
        },
    },
    actions: {
        addNewQuestionnaire({commit}, questionnaire) {
            commit('addNewQuestionnaire', questionnaire)
        },
        addToQuestionnaire({commit}, question) {
            commit('addToQuestionnaire', question)
        },
        addOptions({commit}, {question, option}) {
            commit('addOptions', {question, option})
        },
        updateQuestion({commit}, {questionId, title}) {
            commit('updateQuestion', {questionId, title})
            commit('saveToStorage')
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
        },
        removeAllOptions({commit}, questionID) {
            commit('removeAllOptions', questionID)
        },
        setCurrentQuestionnaire({commit}, id) {
            commit('setCurrentQuestionnaire', id)
        },
        response({commit}, {questionnaireId, data}) {
            commit('response', {questionnaireId, data})
        },
        removeResponse({commit}, {questionnaireId, responseId}) {
            commit('removeResponse', {questionnaireId, responseId})
        },
        saveToStorage({commit}){
            commit('saveToStorage')
        },
        readFromStorage({commit}){
            commit('readFromStorage')
        }
    }
})
