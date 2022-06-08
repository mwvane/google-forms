<template>
  <div>
    <FormHeader></FormHeader>
    <div class="row justify-content-center">
      <div class="col-12 col-md-9 col-lg-8 col-xl-7" v-if="isLoaded">
        <div class="card card-shadow rounded my-4 p-4" v-for="question in currentQuestionnaire.questions" :key="question.id">
          <div class="question">
            <h4>{{ question.question }}</h4>
          </div>
          <div class="options">
            <div v-for="answer in question.answers" :key="question.id + '_' + answer.id">
              <div v-if="isCheckBox(question.type)">
                <div class="form-check mb-2">
                  <input
                         v-model="data[question.id].answer"
                         :value="answer.id"
                         class="form-check-input"
                         type="checkbox"
                         id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                    {{ answer.title }}
                  </label>
                </div>
              </div>
              <div v-else-if="isMultipleChoice(question.type)">
                <div class="form-check mb-2">
                  <input class="form-check-input"
                         v-model="data[question.id].answer"
                         :value="answer.id"
                         type="radio"
                         name="flexRadioDefault"
                         id="flexRadioDefault1">
                  <label class="form-check-label" for="flexRadioDefault1">
                    {{ answer.title }}
                  </label>
                </div>
              </div>
            </div>
            <div v-if="isParagraph(question.type)">
              <textarea class="form-control" placeholder="type here" v-model="data[question.id].answer"></textarea>
            </div>
            <div v-if="isDropdown(question.type)">
              <select class="form-control" @change="selected" v-model="data[question.id].answer">
                <option v-for="option in question.answers" :key="question.id + '_' + option.id" :value="option.title">
                  {{ option.title }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <b-button @click="save" variant="primary">submit</b-button>
      </div>
      <div v-else class="text-center m-5">
        <div class="spinner spinner-border"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import mixin from "@/mixins/mixin";
import FormHeader from "@/components/FormHeader";
import Question from "@/question";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Questions",
  components: {
    FormHeader
  },
  computed: {
    ...mapState(['questionnaire','currentQuestionnaire'])
  },
  data() {
    return {
      data: {},
      isLoaded: false,
    }
  },
  watch: {
    data: {
      handler(newData){
        console.log(this.data)
      },
      deep: true
    }
  },
  mixins: [mixin],
  methods: {
    ...mapActions(['response']),
    selected(e) {
      console.log(this.questions)
    },
    addToCompletedQuestions(e){
      console.log(e)
    },
    save(){
      this.response({questionnaireId: this.$route.params.id, data: this.data})
      this.$router.push({name: 'create', params: {id: this.$route.params.id}})
    }
  },
  mounted() {
    if (!this.currentQuestionnaire) {
      return this.$router.push({name: "home"})
    }

    for (const question of this.currentQuestionnaire.questions) {
      this.data[question.id] = {
        answer: null,
        question: question.copy()
      }
    }
    this.isLoaded = true;
  }
}
</script>

<style scoped>
.question {
  margin-bottom: 15px;
}
.card-shadow {
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%),
  0 3px 1px -2px rgb(0 0 0 / 12%),
  0 1px 5px 0 rgb(0 0 0 / 20%);
}
</style>
