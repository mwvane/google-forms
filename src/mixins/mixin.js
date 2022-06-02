import {TYPE_CHECK_BOX, TYPE_DROPDOWN, TYPE_MULTIPLE_CHOICE, TYPE_PARAGRAPH} from "@/components/helpers/constants";

const mixin = {
    methods: {
        isParagraph(type) {
            return type === TYPE_PARAGRAPH
        },
        isMultipleChoice(type) {
            return type === TYPE_MULTIPLE_CHOICE
        },
        isDropdown(type) {
            return type === TYPE_DROPDOWN
        },
        isCheckBox(type) {
            return type === TYPE_CHECK_BOX
        },
    }
}

export default mixin