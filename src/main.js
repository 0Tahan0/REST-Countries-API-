import { createApp } from "vue";
import store from "./store";
import router from "./router";
import App from "./App.vue";

import "./assets/tailwind.css";
import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(...[fas, far, fab]);

/* add icons to the library */
library.add(fas, far, fab);
const app = createApp(App);

app.component("fs-icon", FontAwesomeIcon);

import theCard from "./components/theCard.vue";
app.component("the-card", theCard);

import theSelect from "./components/theSelect.vue";
app.component("the-select", theSelect);

import theField from "./components/theField.vue";
app.component("the-field", theField);

// ----------------------------
import theNav from "./components/views/theNav.vue";
app.component("the-nav", theNav);
import theButton from "./components/theButton.vue";
app.component("the-button", theButton);

// ----------------------------
app.use(store);
app.use(router);
app.mount("#app");
