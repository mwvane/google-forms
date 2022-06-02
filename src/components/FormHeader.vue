<template>
  <div class="container-fluid p-4 bg-light">
    <img class="img" width="50" src="../assets/g-forms-logo.png" alt="logo">
    <span class="mx-3">{{title}}</span>
  </div>
</template>

<script>
export default {
  name: "FormHeader",
  data() {
    return {
      title: "Untitled",
      description: "",
      question: "Untitled Question",
      options: [],
    }
  }
}
</script>

<style>
</style>