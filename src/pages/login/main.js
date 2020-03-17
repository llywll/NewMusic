import Vue from 'vue'
import App from './App'
import Vaxios from './../../util/ajax'
import router from './router'
import store from '../render/store/store.js'
import { db, userDb } from './../../util/nedb.js'
import { ipcRenderer } from 'electron'

Vue.prototype.$httpV = Vaxios
Vue.config.productionTip = false
Vue.$db = Vue.prototype.$db = db
Vue.$db = Vue.prototype.$user = userDb

Vue.$ipc = Vue.prototype.$ipc = ipcRenderer

new Vue({
  router,
  store,
  db, 
  userDb,
  render: h => h(App)
}).$mount('#app')
