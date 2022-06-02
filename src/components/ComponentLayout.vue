<template>
  <div class="card rounded card-shadow m-3 py-3 px-4">
    <div class="header">
      <div class="">
        <div class="row">
          <div class="col-md-9 col-12">
            <input class="question-title-input"
                   placeholder="Question"
                   v-model="questionText"
                   @input="textChange">
          </div>
          <div class="col-md-3 col-6">
            <select class="form-control" @change="changeType">
              <option v-for="item in selectOptions"
                      :key="item"
                      :value="item.value"
                      :id="item.id"> {{ item.text }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="body mt-2">
      <slot></slot>
    </div>
    <div class="footer mt-2">
      <font-awesome-icon class="del-btn" @click="deleteTemplate" icon="trash"></font-awesome-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComponentLayout",
  props: {
    selectOptions: Array,
    id: Object,
    questionValue: String
  },
  data() {
    return {
      questionText: this.questionValue,
      delayedUpdate: null,
    }
  },
  methods: {
    changeType(e) {
      this.$emit('changeType', this.id, e.target.value)
    },
    deleteTemplate() {
      this.$emit('deleteTemplate', this.id)
    },
    textChange(e) {
      if (this.delayedUpdate) {
        clearInterval(this.delayedUpdate)
      }
      this.delayedUpdate = setTimeout(() => {
        this.$emit('textChange', this.id, e.target.value)
      }, 300);
    }
  },
}
</script>

<style scoped>
.card-shadow {
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%),
  0 3px 1px -2px rgb(0 0 0 / 12%),
  0 1px 5px 0 rgb(0 0 0 / 20%);
}

.question-title-input {
  width: 100%;
  outline: none;
  border: none;
  font-size: 14px;
  padding: 8px;
}

.question-title-input:focus {
  border-bottom: #5712c7 3px solid;
}

.del-btn {
  position: absolute;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
  color: #494646;
}

.del-btn:hover {
  color: darkred;
}
</style>
