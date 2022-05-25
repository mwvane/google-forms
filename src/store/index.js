import { createStore } from 'vuex'
export default createStore({
  state: {
    formTitle: "Untitled",
    questions: []
  },
  getters: {
    getMaxID: state =>{
      let id = 0;
      for(let item of state.questions){
        if(item.id > id){
          id = item.id
        }
      }
      return id
    }
  },
  mutations: {
    addToQuestions(state, question){
      state.questions.push(question)
    },
    updateQuestion(state, {oldID, newQuestion}){
      debugger
      let questionIndex = state.questions.findIndex(question => oldID === question.id)
      this.state[questionIndex] = {...newQuestion}
      console.log(state.questions)
    }
  },
  actions: {
    addToQuestions({commit}, question){
      commit('addToQuestions',question)
    },
    updateQuestion({commit}, {oldID, newQuestion}){
      commit('updateQuestion',{oldID, newQuestion})
    }
  },
  modules: {

  }
})
