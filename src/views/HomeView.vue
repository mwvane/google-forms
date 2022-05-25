<template>
  <div class="home">
    <router-link to="/create">
      <Template>
        <img class="template-img" src="../assets/plus.png" alt="blank-image">
        <label class="title">Blank</label>
      </Template>
    </router-link>
  </div>
</template>

<script>
import Template from "@/components/Template";
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
    Template,
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
</style>
