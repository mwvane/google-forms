<template>
  <div class="d-flex justify-content-center">
    <div>
      <img class="template-img" src="../assets/plus.png" alt="blank-image" @click="createForm()">
      <p class="title" @click="createForm()">Blank</p>
    </div>
    <div class="questionnaire" v-for="item in questionnaire"
         :key="item.id"
         @click="createForm(item.id)">
      <img class="template-img" src="../assets/template.jpg" alt="blank-image" @click="goToCreate">
      <div class="action">
        <font-awesome-icon v-if="item.responses.length > 0" class="mx-2 response" icon="clipboard-check" @click="goToResponses($event, item.id)"></font-awesome-icon>
        <font-awesome-icon class="del" icon="trash" @click="deleteTemplate($event, item.id)"></font-awesome-icon>
      </div>
      <p class="title">{{ item.id }}</p>
    </div>
  </div>
</template>

<script>
import Template from "@/components/Template";
// @ is an alias to /src
import {mapActions, mapState} from "vuex";
import Helpers from "@/components/helpers/helpers";

export default {
  name: 'HomeView',
  components: {},
  computed: {
    ...mapState(['questionnaire', 'currentQuestionnaire'])
  },
  methods: {
    ...mapActions(['addNewQuestionnaire', "removeQuestionnaire"]),
    createForm(id = null) {
      if (id === null) {
        this.addNewQuestionnaire({
          questions: [],
          responses: [],
        })
        id = this.currentQuestionnaire.id
      }
      this.$router.push({name: 'create', params: {id: id}})
    },
    deleteTemplate(e, id) {
      e.stopPropagation()
      this.removeQuestionnaire(id)
    },
    goToResponses(e, id) {
      e.stopPropagation()
      this.$router.push({name: 'responses', params: {id: id}})
    }
  }
}
</script>

<style scoped>
.template-img {
  width: 170px;
  height: 170px;
  border-radius: 5px;
  border: 1px solid white;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%),
  0 3px 1px -2px rgb(0 0 0 / 12%),
  0 1px 5px 0 rgb(0 0 0 / 20%);
}

.template-img:hover {
  border-color: #5712c7
}

.title {
  margin: 10px;
  font-weight: bold;
  width: 170px;
  text-align: center;
  text-decoration: none;
}

.questionnaire {
  text-align: center;
  position: relative;
}

.action {
  position: absolute;
  top: 2px;
  right: 15px;
  color: #5b5858;
  display: none;
  font-size: 20px;
}
.questionnaire:hover .action{
  display: flex;
}
.del:hover{
  color: #c00909;
}
.response:hover{
  color: #023af1;
}

</style>
