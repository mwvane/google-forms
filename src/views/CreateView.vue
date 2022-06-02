<template>
  <div class="google-form">
    <div class="page-header">
      <FormHeader></FormHeader>
    </div>

    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-9 col-xl-8" style="max-width: 800px">
        <div class="question-buttons">
          <b-button variant="primary" class="m-3" @click="add()"> Add</b-button>
          <b-button @click="goToQuestions()"> Go to questions</b-button>
        </div>
        <div class="questions">
          <div v-if="isLoaded">
            <ComponentLayout v-for="question in questions"
                             :key="question.id"
                             :id="question.id"
                             :selectOptions="selectOptions"
                             :question-value="question.question"
                             @deleteTemplate="deleteQuestion"
                             @textChange="changeQuestion"
                             @changeType="changeType">
              <div v-if="isParagraph(question.type)">
                <ParagraphComponent></ParagraphComponent>
              </div>
              <div v-else>
                <OptionsComponent :question="question"
                                  @removeOption="deleteOption"
                                  @textChange="updateOptionTitle"
                                  @addOption="addOption(question)"
                ></OptionsComponent>
              </div>
              <font-awesome-icon icon="copy"
                                 class="copy"
                                 @click="copy(question)"
              ></font-awesome-icon>
            </ComponentLayout>
          </div>
          <div v-if="questions.length === 0 && isLoaded" class="text-center m-5">
            <p> There are not questions yet. Create one </p>
          </div>
          <div class="text-center mt-5" v-if="!isLoaded">
            <div class="spinner spinner-border"
                 style="width: 70px; height: 70px; border-width: .6rem; color: #da8e67">
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import FormHeader from "@/components/FormHeader";
import Question from "@/question";
import Helpers from "@/components/helpers/helpers.js";
import {mapActions, mapState} from "vuex";
import ComponentLayout from "@/components/ComponentLayout";
import ParagraphComponent from "@/components/ParagraphComponent";
import {TYPE_CHECK_BOX, TYPE_DROPDOWN, TYPE_MULTIPLE_CHOICE, TYPE_PARAGRAPH} from "@/components/helpers/constants";
import OptionsComponent from "@/components/OptionsComponent";
import mixin from "@/mixins/mixin";

export default {
  name: "CreateView",
  components: {
    OptionsComponent,
    // eslint-disable-next-line vue/no-unused-components
    FormHeader,
    ComponentLayout,
    ParagraphComponent
    // Paragraph,
  },
  computed: {
    ...mapState(['questions']),
  },
  data() {
    return {
      isLoaded: false,
      selectOptions: [
        {
          id: 1,
          text: "Multiple choice",
          value: TYPE_MULTIPLE_CHOICE,
        },
        {
          id: 2,
          text: "Check box",
          value: TYPE_CHECK_BOX,
        },
        {
          id: 3,
          text: "Dropdown",
          value: TYPE_DROPDOWN,
        },
        {
          id: 4,
          text: "Paragraph",
          value: TYPE_PARAGRAPH,
        },
      ]
    }
  },
  mixins: [mixin],
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
    add() {
      const question = Question.getDefaultQuestion()
      this.addToQuestions(question)
    },
    changeQuestion(id, val) {
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
    updateOptionTitle({option_id, question_id, value}) {
      this.updateOption({
        questionID: question_id,
        optionID: option_id,
        title: value
      })
    },
    deleteOption({option_id, question_id}) {
      this.removeOption({questionID: question_id, optionID: option_id})
    },
    deleteQuestion(id) {
      this.removeQuestion(id)
    },
    goToQuestions() {
      this.$router.push({name: 'questions', params: {id: 'questionID'}})
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 300)
  }
}
</script>

<style scoped>
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
