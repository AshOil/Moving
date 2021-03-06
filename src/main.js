import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import router from './router'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { ModalPlugin } from 'bootstrap-vue'
import VueYoutube from 'vue-youtube'
import VueAutosuggest from "vue-autosuggest";

Vue.use(VueAutosuggest)
Vue.use(VueYoutube)
Vue.use(ModalPlugin)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
