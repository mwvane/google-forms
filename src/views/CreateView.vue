<template>
  <div class="container">
    <FormComponent></FormComponent>
    <button @click="add">add</button>
    <button @click="update(1)">update</button>
  </div>
</template>

<script>
import FormComponent from "@/components/FormComponent";
import Question from "@/question";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreateView",
  components: {
    FormComponent
  },
  computed: {
    ...mapGetters(['getMaxID']),
  },
  methods: {
    ...mapActions(['addToQuestions', "updateQuestion"]),
    add() {
      let question = new Question(this.getMaxID + 1, '', '', [])
      this.addToQuestions(question)
    },
    update(id){
      this.updateQuestion({oldID: id, newQuestion: new Question(id,'who are you?','',[{id:1, title: ''}])})
    }
  }
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