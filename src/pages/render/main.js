import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store/store.js'
import ds from './util/nedb.js'
import { ipcRenderer } from 'electron'

Vue.prototype.$http = axios
Vue.$db = Vue.prototype.$db = ds
Vue.config.productionTip = false

Vue.$ipc = Vue.prototype.$ipc = ipcRenderer


new Vue({
  router,
  store,
  ds,
  render: h => h(App)
}).$mount('#app')
