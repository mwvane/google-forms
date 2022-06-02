<template>
  <div class="home">
    <div>
      <div class="create-form" @click="createForm()">
        <img class="template-img" src="../assets/plus.png" alt="blank-image">
        <p class="title" @click="createForm()">Blank</p>
      </div>
    </div>
  </div>
</template>

<script>
import Template from "@/components/Template";
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  },
  methods: {
    createForm() {
      this.$router.push({name: "create"})
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

.create-form {
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
</style>
