<template>
  <div class="option-container">
    <div v-if="type === 'Multiple choices'">
      <div class="radio"></div>
    </div>
    <div v-else-if="type === 'Check boxes'">
      <div class="check-box"></div>
    </div>
    <div class="dropdown" v-else-if="type === 'Dropdown'">{{option.id}}. </div>
    <input type="text" class="option" v-model="text">
    <button @click="remove">x</button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Option",
  props: {
    option: Object,
    questionID:Number,
    type: String,
    optionNumber: Number,
  },
  data() {
    return {
      text: this.option.title
    }
  },
  methods: {
    remove() {
      this.$emit('removeOption', this.option.id,this.questionID)
    }
  }
}
</script>

<style scoped>
.option-container {
  display: flex;
}

.option {
  width: 80%;
}
input {
  margin: 8px;
  padding: 8px;
  outline: none;
  border: none;
  font-size: 14px;
}

input:focus {
  border-bottom: #5712c7 3px solid;
}
button{
  border:none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  height: 20px;
  margin-top: 10px;
  color: darkred;
}
button:hover{
  font-weight: bold;
}
.radio{
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #afacac;
  margin-top: 12px;
}
.check-box{
  height: 18px;
  width: 18px;
  border-radius: 6px;
  border: 2px solid rgba(45,45,45,40%);
  margin-top: 12px;
}
.dropdown{
  height: 18px;
  width: 18px;
  margin-top: 16px;
  text-align: center;
}
</style>