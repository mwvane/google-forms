<template>
  <div class="multiple-choice-container">

  </div>
</template>

<script>
import Helpers from "@/components/helpers/helpers.js";
import {mapActions, mapGetters, mapState} from "vuex";
import Option from "@/components/Option";

export default {
  name: "multipleChoice",
  props: {
    question: Object,
    selectOptions: Array
  },
  computed: {
    ...mapState(["questions"]),
  },
  methods: {
    ...mapActions([
      "addOptions",
      "updateQuestion",
      "updateOption",
      "updateType",
      "removeQuestion",
      "removeOption",
    ]),
    deleteOption(id) {
      this.removeOption({questionID: this.question.id, optionID: id})
    },
    addOption() {
      let question = this.questions.find(item => item.id === this.question.id)
      this.addOptions({
        question: question,
        option: {id: Helpers.getID(question.answers), title: `option ${Helpers.getID(question.answers)}`}
      })
    },
    updateQuestionTitle(e) {
      this.updateQuestion({questionId: this.question.id, title: e.target.value})
    },
    updateOptionTitle(e, id) {
      this.updateOption({questionID: this.question.id, optionID: id, title: e.target.value})
    },
    deleteQuestion() {
      this.removeQuestion(this.question.id)
    },
    changeType(e) {
      this.updateType({questionID: this.question.id, type: e.target.value})
    }
  },
}
</script>

<style scoped>

input {
  margin: 8px;
  padding: 8px;
  outline: none;
  border: none;
  font-size: 14px;
}

input:focus {
  border-bottom: #5712c7 3px solid;
}
.option {
  width: 80%;
}
</style>
