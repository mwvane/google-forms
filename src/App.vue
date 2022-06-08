<template>
  <div>
      <router-view></router-view>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";

  export default {
    computed: {
      ...mapState(['questionnaire'])
    },
    data() {
      return {
        obj: {}
      }
    },
    watch:{
      questionnaire: {
        handler(){
          this.saveToStorage()
        },
        deep: true
      }
    },
    methods:{
      ...mapActions(['readFromStorage','saveToStorage']),
      load(){
        this.readFromStorage()
      }
    },
    mounted() {
      this.load()
    },
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
