<template>
  <div class="google-form">
    <div v-if="isLoaded">
      <div class="page-header">
        <div class="response">

        </div>
        <FormHeader
            :response-counter="currentQuestionnaire.responses.length"
            :response-id="Number(this.$route.params.id)">
        </FormHeader>
      </div>
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9 col-xl-8" style="max-width: 800px">
          <div class="question-buttons">
            <b-button variant="primary" class="m-3" @click="add()"> Add</b-button>
            <b-button @click="goToQuestions()"> Go to questions</b-button>
          </div>
          <div class="questions">
            <div v-if="isLoaded">
              <ComponentLayout v-for="question in currentQuestionnaire.questions"
                               :key="question.id"
                               :id="question.id"
                               :selectOptions="selectOptions"
                               :question-value="question.question"
                               @deleteTemplate="deleteQuestion"
                               @textChange="changeQuestion"
                               @changeType="changeType"
                               @uploadFile="uploadFile($event, question.id)">
                <div v-if="question.image" class="text-center">
                  <img class="picture" :src="question.image" alt="no image">
                </div>
                <div v-else>
                  no image
                </div>
                <div v-if="isParagraph(question.type)">
                  <ParagraphComponent></ParagraphComponent>
                </div>
                <div v-else>
                  <OptionsComponent :question="question"
                                    @removeOption="deleteOption"
                                    @updateOptionTitle="updateOptionTitle"
                                    @addOption="addOption(question)"
                  ></OptionsComponent>
                </div>
                <div class="form-check form-switch toggle">
                  <input class="form-check-input"
                         type="checkbox"
                         role="switch"
                         v-model="question.isRequired">
                  <label class="form-check-label" for="flexSwitchCheckDefault">Required</label>
                </div>
                <font-awesome-icon icon="copy"
                                   class="copy"
                                   @click="copy(question)"
                ></font-awesome-icon>
              </ComponentLayout>
            </div>
            <div v-if="currentQuestionnaire.questions.length === 0 && isLoaded" class="text-center m-5">
              <p> There are not questions yet. Create one </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-5" v-if="!isLoaded">
      <div class="spinner spinner-border"
           style="width: 70px; height: 70px; border-width: .6rem; color: #da8e67">
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
    ...mapState(['questionnaire', 'currentQuestionnaire']),
  },
  data() {
    return {
      isLoaded: false,
      isChecked: false,
      image: null,
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
          'addToQuestionnaire',
          "updateQuestion",
          "removeOption",
          "removeQuestion",
          "updateType",
          "addOptions",
          "removeAllOptions",
          "updateOption",
          "setCurrentQuestionnaire",
          "saveImage",
        ]),
    add() {
      const question = Question.getDefaultQuestion()
      this.addToQuestionnaire(question)
    },
    changeQuestion(id, val) {
      this.updateQuestion({questionId: id, title: val})
    },
    copy(question) {
      this.addToQuestionnaire(question.copy())
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
      this.$router.push({name: 'questions', params: {id: this.currentQuestionnaire.id}})
    },
    uploadFile(image, id) {
      this.createToBase64Image(image, id)
    },
    createToBase64Image(image, id) {
      let reader = new FileReader()
      reader.onload = (e) => {
        this.saveImage({image: e.target.result, id: id})
      };
      reader.readAsDataURL(image)
    },
  },
  mounted() {
    this.setCurrentQuestionnaire(this.$route.params.id)
    setTimeout(() => {
      this.isLoaded = true;
    }, 300)
    const temp = this.currentQuestionnaire.questions
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

.toggle {
  position: absolute;
  bottom: 2px;
  right: 60px;
  font-size: 13px;
}

.picture {
  max-width: 70%;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%);
  border-radius: 10px;
}
</style>
