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
    faXmark,
    faClipboardCheck,
    faImage
}
from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
library.add(
    faTrash,
    faAdd,
    faCircleMinus,
    faSquareCheck,
    faCircleDot,
    faSquareCaretDown,
    faAlignLeft,
    faCopy,
    faXmark,
    faClipboardCheck,
    faImage
)

const app = createApp(App)
    .use(store)
    .use(router)
    .component("font-awesome-icon",FontAwesomeIcon)

import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
app.use(BootstrapVue3)
app.mount('#app')
