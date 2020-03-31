import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Vaxios from './../../util/ajax'
import router from './router'
import store from './store/store.js'
import fs from 'fs'
import { dataDb, userDb } from './../../util/nedb.js'


const { remote } = require("electron");
import { ipcRenderer } from 'electron'
const { Menu, MenuItem } = remote;

Vue.prototype.$http = axios
Vue.prototype.$httpV = Vaxios
Vue.$db = Vue.prototype.$db = dataDb
Vue.$db = Vue.prototype.$userDb = userDb
Vue.config.productionTip = false

Vue.$ipc = Vue.prototype.$ipc = ipcRenderer
Vue.$remote = Vue.prototype.$remote = remote
Vue.$home =Vue.prototype.$home = remote.app.getPath('home')
Vue.$fs = Vue.prototype.$fs = fs
Vue.$MainWinodw =Vue.prototype.$MainWinodw =remote.BrowserWindow.fromId(1).webContents
Vue.$Menu = Vue.prototype.$Menu = Menu
Vue.$MenuItem = Vue.prototype.$MenuItem = MenuItem


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
