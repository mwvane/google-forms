<template>
  <div>
    <div v-for="question in questions" :key="question.id">
      {{question.question}}
      <div class="question">
        <div  v-for="answer in question.answers" :key="question.id + '_' + answer.id">
          <div v-if="question.type === 'Check box'">
            <input  type="checkbox">
            <label>{{answer.title}}</label>
          </div>
         <div v-else-if="question.type === 'Multiple choice'">
           <input  type="radio">
           <label>{{answer.title}}</label>
         </div>
        </div>
        <div v-if="question.type === 'Paragraph'">
          <textarea placeholder="type here"></textarea>
        </div>
        <div v-if="question.type === 'Dropdown'">
          <select  @change="selected">
            <option v-for="option in question.answers" :key="question.id + '_' + option.id"  :value="option.title">{{option.title}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <button>submit</button>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Questions",
  computed:{
    ...mapState(['questions',])
  },
  methods:{
    selected(e){
      console.log('hello')
      console.log(e.target.value)
    }
  }
}
</script>

<style scoped>
 .question{
   margin-bottom: 15px;
 }
</style>
