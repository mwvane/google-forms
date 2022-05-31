import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faTrash,
    faAdd,
    faCircleMinus,
    faSquareCheck,
    faCircleDot,
    faSquareCaretDown,
    faAlignLeft,
    faCopy,
}
from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"

createApp(App).use(store).use(router).component("font-awesome-icon",FontAwesomeIcon).mount('#app')
library.add(
    faTrash,
    faAdd,
    faCircleMinus,
    faSquareCheck,
    faCircleDot,
    faSquareCaretDown,
    faAlignLeft,
    faCopy,
)