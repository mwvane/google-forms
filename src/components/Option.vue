<template>
  <div class="option-container">
    <div v-if="type === 'Multiple choice'">
      <font-awesome-icon class="icon" icon="circle-dot"></font-awesome-icon>
      <div></div>
    </div>
    <div v-else-if="type === 'Check box'">
      <font-awesome-icon class="icon" icon="square-check"></font-awesome-icon>
    </div>
    <div v-else-if="type === 'Dropdown'">
      <font-awesome-icon class="icon" icon="square-caret-down"></font-awesome-icon>
    </div>
    <input type="text" class="option" v-model="text" @input="textChange">
    <button @click="remove">
      <font-awesome-icon icon="circle-minus"></font-awesome-icon>
    </button>

  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Option",
  components: {
  },

  props: {
    option: Object,
    questionID: Number,
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
      this.$emit('removeOption', this.option.id, this.questionID)
    },
    textChange(e){
      this.$emit("textChange", this.questionID,this.option.id, e.target.value)
    }
  }
}
</script>

<style scoped>
.option-container {
  display: flex;
  color: #504e4e;
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

button {
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  height: 20px;
  margin-top: 10px;
  color: #504e4e;
}

button:hover {
  font-weight: bold;
  color: darkred;
}

.icon {
  height: 20px;
  width: 20px;
  margin-top: 12px;
}

span {
  padding-left: 20px;
  margin-left: 10px;
  width: 80%;
  border-bottom: 1px dotted;
  color: #6c6a6a;
}
</style>