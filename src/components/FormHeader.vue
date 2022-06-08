<template>
  <div class="container-fluid p-4 bg-light">
    <div class="d-flex justify-content-between">
      <div>
        <img @click="goToHome" class="img" width="50" src="../assets/g-forms-logo.png" alt="logo">
        <span class="mx-3">{{title}}</span>
      </div>
      <div>
        <b-button @click="goToResponses" variant="secondary">Response ({{responseCounter}})</b-button>
      </div>
    </div>
    </div>

</template>

<script>
export default {
  name: "FormHeader",
  props:{
    responseCounter: Number,
    responseId: Number
  },
  data() {
    return {
      title: "Untitled",
      description: "",
      question: "Untitled Question",
      options: [],
    }
  },
methods:{
  goToResponses(){
    this.$router.push({name: 'responses', params: {id: this.responseId}})
  },
  goToHome(){
    this.$router.push({name:'home'})
  }
}
}
</script>

<style>
</style>