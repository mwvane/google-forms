<template>
  <FormHeader></FormHeader>
  <div class="row d-flex justify-content-center">
    <div class="card my-2 mx-5 border-2 p-5 answers " v-for="(item, index) in response.data" :key="item.id">
      <div class="count shadow">{{ index  }}</div>
      <h2>{{ item.question.question }}</h2>
      <p>{{ item.answer }}</p>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import Helpers from "@/components/helpers/helpers";
import FormHeader from "@/components/FormHeader";
export default {
  name: "ResponseDetails",
  components:{
    FormHeader
  },
  data() {
    return {
      response: {}
    }
  },
  computed: {
    ...mapState(['questionnaire'])
  },
  mounted() {
    let questionnaireId = Number(this.$route.params.question_id)
    let responseId = Number(this.$route.params.id)
    this.response = Helpers.getItemById(
        responseId,
        Helpers.getItemById(questionnaireId, this.questionnaire).responses)
    console.log(this.response)
  }
}
</script>

<style scoped>
.count {
  width: 25px;
  height: 25px;
  background-color: white;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  border-bottom-right-radius: 10px;
}
.answers{
  max-width: 70%;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%)
}
</style>