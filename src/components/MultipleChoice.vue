<template>
  <div class="multiple-choice-container">
    <select class="dropdown" name="typeSelector" id="typeSelector" @change="changeType">
      <option v-for="item in selectOptions" :key="item" :value="item.value" :id="item.id"> {{ item.value }}</option>
    </select>
    <input type="text" placeholder="Question" @input="updateQuestionTitle">
    <div>
      <Option v-for="option in question.answers"
              :key="question.id + '_' + option.id"
              :option="option"
              :type="question.type"
              v-model="option.title"
              @removeOption="deleteOption"
              @input="updateOptionTitle($event,option.id)">
      </Option>
    </div>
    <button @click="addOption">Add option</button>
    <button @click="deleteQuestion">Delete</button>
  </div>
</template>

<script>
import Helpers from "@/components/helpers/helpers.js";
import {mapActions, mapGetters, mapState} from "vuex";
import Option from "@/components/Option";

export default {
  name: "multipleChoice",
  components: {
    Option,
  },
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
.multiple-choice-container {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-bottom: 10px;
  width: 100%;
  background-color: white;
  border-radius: 5px;
}

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

.dropdown {
  width: 200px;
  align-self: end;
  margin: 3px;
  padding: 8px;
  color: black;
  border: 2px solid #afacac;
  border-radius: 6px;
  background-color: white;
}

.option {
  width: 80%;
}
button{
  width: 200px;
  align-self: center;
}
</style>
