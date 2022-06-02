<template>
  <div class="option-container">
    <div v-if="isMultipleChoice(type)">
      <font-awesome-icon class="icon" icon="circle-dot"></font-awesome-icon>
      <div></div>
    </div>
    <div v-else-if="isCheckBox(type)">
      <font-awesome-icon class="icon" icon="square-check"></font-awesome-icon>
    </div>
    <div v-else-if="isDropdown(type)">
      <font-awesome-icon class="icon" icon="square-caret-down"></font-awesome-icon>
    </div>
    <input type="text" class="option" placeholder="option..." v-model="text" @input="textChange">
    <button @click="remove">
      <font-awesome-icon icon="circle-minus"></font-awesome-icon>
    </button>
  </div>
</template>

<script>
import mixin from "@/mixins/mixin";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Option",
  components: {},

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
  mixins: [mixin],
  methods: {
    remove() {
      this.$emit('removeOption', {option_id: this.option.id, question_id: this.questionID})
    },
    textChange() {
      this.$emit("textChange", {option_id: this.option.id, question_id: this.questionID, value: this.text})
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
  border-bottom: 2px solid #f4efef;
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