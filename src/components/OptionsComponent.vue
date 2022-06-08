<template>
  <div class="">
    <Option v-for="option in question.answers"
            :key="question.id + '_' + option.id"
            :option="option"
            :questionID="question.id"
            :type="question.type"
            @removeOption="removeOption"
            @textChange="updateOptionTitle"
    ></Option>

    <div v-if="question.answers.length === 0">
      <p class="mx-3 text-muted" style="font-size: .9rem"> There are no options </p>
    </div>

    <div class="mb-2" style="height: 30px !important;">
      <button class="add-option" @click="addOption(question)">
        <font-awesome-icon icon="add"></font-awesome-icon>
        Add
        {{ getOptionLabel }}
      </button>
    </div>

  </div>
</template>

<script>
import Option from "@/components/Option";
import {TYPE_CHECK_BOX, TYPE_DROPDOWN, TYPE_MULTIPLE_CHOICE, TYPE_PARAGRAPH} from "@/components/helpers/constants";

export default {
  name: "OptionsComponent",
  components: {
    Option,
  },
  props: {
    question: {
      type: Object,
    }
  },
  computed: {
    getOptionLabel() {
      if (this.question.type === TYPE_PARAGRAPH) {
        return "Paragraph";
      } else if (this.question.type === TYPE_CHECK_BOX) {
        return "Checkbox"
      } else if (this.question.type === TYPE_DROPDOWN) {
        return "Dropdown"
      } else if (this.question.type === TYPE_MULTIPLE_CHOICE) {
        return "Multiple choice"
      }
      return ""
    }
  },
  methods: {
    removeOption({option_id, question_id}) {
      this.$emit('remove-option', {option_id, question_id})
    },
    updateOptionTitle({option_id, question_id, value}) {
      this.$emit('update-option-title', {option_id, question_id, value})
    },
    addOption() {
      this.$emit('add-option')
    }
  }
}
</script>

<style scoped>
.add-option {
  border: none;
  background-color: rgba(0, 0, 0, 0%);
  color: #918d8d;
  cursor: pointer;
  margin-top: 20px;
}

.add-option:hover {
  transition: .3s;
  font-size: 14px;
  color: #81ae34;
}

</style>
