<template>
  <div class="container">
    <img class="img" src="../assets/g-forms-logo.png" alt="logo">
    <label class="title">{{title}}</label>
  </div>
  <div>
    <div class="form-title">
      <input type="text" v-model="title">
      <input type="text" v-model="description" placeholder="Description">
    </div>
  </div>
</template>

<script>
export default {
  name: "FormComponent",
  data(){
    return{
      title: "Untitled",
      description: "",
      question: "Untitled Question",
      options: [],
    }
  }
}
</script>

<style scoped>
.img{
  width: 30px;
  height: 41px;
}
.title{
margin-left: 20px;
}
.container{
  display: flex;
  background-color: #fff;
  height: 106px;
  padding: 10px;
  align-items: center;
  margin-bottom: 15px;
}
input{
  margin: 10px;
  display: block;
  width: 93%;
  border: none;
  padding: 6px;
  font-size: 16px;
}
input:focus{
  outline: none;
  border-bottom: 2px solid #5712c7;
}
.form-title{
  width: 100%;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
}
</style>