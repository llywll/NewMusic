import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store/store.js'
import { ipcRenderer } from 'electron'

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.$ipc = Vue.prototype.$ipc = ipcRenderer


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
