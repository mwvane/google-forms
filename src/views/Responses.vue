<template>
  <FormHeader></FormHeader>

  <div class="d-flex justify-content-center">
    <div class="card p-5 border-3 m-3 response" v-for="(item, index) in data.responses"
         :key="item"
          @click="responseDetail(item.id)">
      <h3>response {{ index + 1 }}</h3>
      <div class="del">
        <font-awesome-icon icon="xmark" @click="deleteResponse($event, item.id)"></font-awesome-icon>
      </div>
    </div>
    <div class="message" v-if="showMessage">
      <p>there are no more response, please <span @click="goToHome" class="link"> go to home</span></p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import FormHeader from "@/components/FormHeader";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Responses",
  components:{
    FormHeader
  },
  data() {
    return {
      data: {},
      showMessage: false
    }
  },
  computed: {
    ...mapState(["questionnaire"])
  },
  mounted() {
    this.data = this.questionnaire.find(item => item.id === Number(this.$route.params.id))
  },
  methods:{
    ...mapActions(['removeResponse']),
    responseDetail(id){
        this.$router.push({name: 'responseDetails', params: {question_id: this.$route.params.id ,id: id}})
    },
    deleteResponse(e,id){
        e.stopPropagation()
        this.removeResponse({questionnaireId: this.$route.params.id, responseId: id})
        this.showMessage = this.data.responses.length === 0;
    },
    goToHome(){
      this.$router.push({name:'home'})
    }
  }
}
</script>

<style scoped>
.response:hover {
  cursor: pointer;
  background: #f8f5f5;
}
.response:hover .del{
  display: block;
}
.del{
  position: absolute;
  top: 0;
  right: 5px;
  color: #e80a0a;
  display: none;
}
.message{
  font-size: 18px;
  margin-top: 50%;
}
.link{
  color: #5b80b2;
}
.link:hover{
  color: #023af1;
  cursor: pointer;
}
</style>