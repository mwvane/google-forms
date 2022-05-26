<template>
  <div class="multiple-choice-container">
    <input type="text" placeholder="Question" @input="updateQuestionTitle">
    <input type="text" v-for="option in options" :key="question.id + '_' + option.id" v-model="option.title" @input="updateOptionTitle($event,option.id)">
    <button @click="addOption">Add option</button>
  </div>
</template>

<script>
import Helpers from "@/components/helpers/helpers.js";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "multipleChoice",
  data() {
    return {
      options: []
    }
  },
  props:{
    question: Object
  },
  computed: {
    ...mapState(["questions"]),
  },
  methods: {
    ...mapActions(["addOptions","updateQuestion","updateOption"]),

    addOption() {
      let question = this.questions.find(item => item.id === this.question.id)
      this.addOptions({question: question, option: {id: Helpers.getID(question.answers), title: `option ${Helpers.getID(question.answers)}`}})
      console.log(this.options)
    },

    updateQuestionTitle(e){
      this.updateQuestion({questionId: this.question.id, title: e.target.value})
    },
    updateOptionTitle(e,id){
      this.updateOption({questionID: this.question.id, optionID: id, title: e.target.value})
    }
  },
  mounted(){
    this.options = this.question.answers
  }
}
</script>

<style scoped>
  .multiple-choice-container{
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
    background-color: white;
    border-radius: 5px ;
  }
  input{
    margin: 8px;
    padding: 8px;
    outline: none;
    border: none;
    font-size: 14px;
  }
  input:focus{
    border-bottom: #5712c7 3px solid;
  }
</style>
