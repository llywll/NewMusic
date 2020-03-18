import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Vaxios from './../../util/ajax'
import router from './router'
import store from './store/store.js'
import { dataDb, userDb } from './../../util/nedb.js'

import { ipcRenderer } from 'electron'

Vue.prototype.$http = axios
Vue.prototype.$httpV = Vaxios
Vue.$db = Vue.prototype.$db = dataDb
Vue.$db = Vue.prototype.$userDb = userDb
Vue.config.productionTip = false

Vue.$ipc = Vue.prototype.$ipc = ipcRenderer


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
