<template>
  <div class="component-container">
    <div class="header">
      <input class="input" type="text" placeholder="Question" v-model="questionText" @input="textChange">
      <select class="dropdown" name="typeSelector" id="typeSelector" @change="changeType">
        <option v-for="item in selectOptions" :key="item" :value="item.value" :id="item.id"> {{ item.value }}</option>
      </select>
    </div>
    <div class="body">
      <slot></slot>
    </div>
    <div class="footer">
      <font-awesome-icon class="del-btn" @click="deleteTemplate" icon="trash"></font-awesome-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComponentLayout",
  props: {
    selectOptions: Array,
    id: Object
  },
  methods: {
    changeType(e) {
      this.$emit('changeType', this.id, e.target.value)
    },
    deleteTemplate() {
      this.$emit('deleteTemplate', this.id)
    },
    textChange(e){
      this.$emit('textChange', this.id, e.target.value)
    }
  },
  data(){
    return{
      questionText: ''
    }
  }
}
</script>

<style scoped>
  .component-container{
    margin: 5px;
    position: relative;
    align-self: center;
    background-color: white;
    max-width: 750px;
    height: auto;
    padding: 10px;
    border-radius: 6px;
    box-shadow:
        0 2px 2px 0 rgb(0 0 0 / 14%),
        0 3px 1px -2px rgb(0 0 0 / 12%),
        0 1px 5px 0 rgb(0 0 0 / 20%);
  }
  .dropdown{
    position: absolute;
    right: 10px;
    top: 10px;
    margin-left: 10px;
    padding:8px
  }
  .input{
    width: 78%;
    outline: none;
    border: none;
    font-size: 14px;
    padding: 8px;
  }
  .input:focus{
    border-bottom: #5712c7 3px solid;
  }
  .del-btn{
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
    color: #494646;
  }
  .del-btn:hover{
    color: darkred;
  }
  .body{
    margin-top: 10px;
  }
  .footer{
    margin-top: 12px;
  }
</style>