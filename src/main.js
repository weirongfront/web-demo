import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import './plugins/element.js'

import "@/assets/scss/variables.scss";
import '@/assets/scss/common.scss';
import '@/assets/scss/project.scss' // global css

import '@/assets/icons/svg' // icon

import '@/assets/icons/font/style.css'

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
