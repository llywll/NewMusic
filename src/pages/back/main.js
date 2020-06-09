import Vue from 'vue'
import App from './App'
import router from './router'
import store from '../render/store/store.js'
import { ipcRenderer } from 'electron'

Vue.config.productionTip = false

Vue.$ipc = Vue.prototype.$ipc = ipcRenderer



new Vue({
  router, 
  store,
  render: h => h(App)
}).$mount('#app')
