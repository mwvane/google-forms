<template>
  <div class="container">
    <FormComponent></FormComponent>
    <button @click="add">add</button>
    <MultipleChoice v-for="question in questions" :key="question.id" :question="question"
                    :selectOptions="selectOptions"></MultipleChoice>
  </div>
</template>

<script>
import FormComponent from "@/components/FormComponent";
import Question from "@/question";
import Helpers from "@/components/helpers/helpers.js";
import {mapActions, mapGetters, mapState} from "vuex";
import MultipleChoice from "@/components/MultipleChoice";

export default {
  name: "CreateView",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    FormComponent,
    MultipleChoice
  },
  computed: {
    ...mapState(['questions']),
  },
  methods: {
    ...mapActions(['addToQuestions', "updateQuestion"]),
    add() {
      let question = new Question(
          Helpers.getID(this.questions),
          '',
          'Multiple choices',
          [{id: 1, title: 'option 1'}])
      this.addToQuestions(question)
    },
  },
  data() {
    return {
      selectOptions: [
        {
          id: 1,
          value: "Multiple choices"
        },
        {
          id: 2,
          value: "Check boxes"
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
</style>
