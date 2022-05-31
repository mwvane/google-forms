<template>
  <div class="container">
    <FormComponent></FormComponent>
    <button @click="add()">add</button>
    <MultipleChoice v-for="question in questions"
                    :key="question.id"
                    :question="question"
                    :selectOptions="selectOptions">
    </MultipleChoice>

    <ComponentLayout @changeType="changeType"
                     v-for="question in questions"
                     :key="question.id"
                     :selectOptions="selectOptions"
                     :id="question.id"
                     @deleteTemplate="deleteQuestion"
                     @textChange="changeQuestion">
      <div v-if="question.type === 'Paragraph'">
        <ParagraphComponent>
        </ParagraphComponent>
      </div>
      <div v-else>
        <Option v-for="option in question.answers"
                :key="question.id + '_' + option.id"
                :option="option"
                :questionID="question.id"
                :type="question.type"
                @removeOption="deleteOption"
                @textChange="updateOptionTitle"
        ></Option>
        <button class="btn-add" @click="addOption(question)">
          <font-awesome-icon icon="add"></font-awesome-icon>
          Add
          {{ question.type }}
        </button>
      </div>
      <font-awesome-icon @click="copy(question)" class="copy" icon="copy"></font-awesome-icon>
    </ComponentLayout>

  </div>
</template>

<script>
import FormComponent from "@/components/FormComponent";
import Question from "@/question";
import Helpers from "@/components/helpers/helpers.js";
import {mapActions, mapGetters, mapState} from "vuex";
import MultipleChoice from "@/components/MultipleChoice";
import ComponentLayout from "@/components/ComponentLayout";
import Option from "@/components/Option";
import ParagraphComponent from "@/components/ParagraphComponent";

export default {
  name: "CreateView",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    FormComponent,
    MultipleChoice,
    ComponentLayout,
    Option,
    ParagraphComponent
    // Paragraph,
  },
  computed: {
    ...mapState(['questions']),
  },
  methods: {
    ...mapActions(
        [
          'addToQuestions',
          "updateQuestion",
          "removeOption",
          "removeQuestion",
          "updateType",
          "addOptions",
          "removeAllOptions",
          "updateOption",
        ]),
    add(question) {
      if (question === undefined) {
        question = new Question(
            1,
            '',
            'Multiple choice',
            [{id: 1, title: 'option 1'}])
      }
      this.addToQuestions(question)
    },
    changeQuestion(id, val){
      this.updateQuestion({questionId: id, title: val})
    },
    copy(question) {
      this.addToQuestions(question.copy())
    },
    changeType(id, type) {
      if (type === 'Paragraph') {
        this.removeAllOptions(id)
      }
      this.updateType({questionID: id, type: type})
    },
    addOption(question) {
      this.addOptions({
        question: question,
        option: {id: Helpers.getID(question.answers), title: `option ${Helpers.getID(question.answers)}`}
      })
    },
    updateOptionTitle(questionID,optionID,val) {
      this.updateOption({
        questionID: questionID,
        optionID: optionID,
        title: val
      })
    },
    deleteOption(id, questionID) {
      this.removeOption({questionID: questionID, optionID: id})
    },
    deleteQuestion(id) {
      console.log(id)
      this.removeQuestion(id)
    },
  },
  data() {
    return {
      selectOptions: [
        {
          id: 1,
          value: "Multiple choice"
        },
        {
          id: 2,
          value: "Check box"
        },
        {
          id: 3,
          value: "Dropdown"
        },
        {
          id: 4,
          value: "Paragraph"
        },
      ]
    }
  },
}
</script>

<style scoped>
.container {
  background-color: #e3e1e6;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.btn-add {
  border: none;
  background-color: rgba(0, 0, 0, 0%);
  color: #504e4e;
  cursor: pointer;
  margin-top: 20px;
}

.btn-add:hover {
  transition: .3s;
  font-size: 14px;
  color: #81ae34;
}

.copy {
  position: absolute;
  bottom: 10px;
  right: 35px;
  cursor: pointer;
  color: #494646;
}

.copy:hover {
  color: #236ed1;
}
</style>
