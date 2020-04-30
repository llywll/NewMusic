import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Vaxios from './../../util/ajax'
import router from './router'
import store from './store/store.js'
import fs from 'fs'
import { dataDb, userDb } from './../../util/nedb.js'
import iscroll from './../../util/iscroll'
import toBase64 from './../../util/util'
import vp from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");

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
Vue.$home = Vue.prototype.$home = remote.app.getPath('home')
Vue.$fs = Vue.prototype.$fs = fs
Vue.$MainWinodw = Vue.prototype.$MainWinodw = remote.BrowserWindow.fromId(1).webContents
Vue.$Menu = Vue.prototype.$Menu = Menu
Vue.$MenuItem = Vue.prototype.$MenuItem = MenuItem
Vue.$iscroll = Vue.prototype.$iscroll = iscroll
Vue.$toBase64 = Vue.prototype.$toBase64 =toBase64

Vue.use(vp)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
