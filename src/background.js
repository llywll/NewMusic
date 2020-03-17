'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import {
  createProtocol,
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'

import axios from 'axios'

const isDevelopment = process.env.NODE_ENV !== 'production'
const ipc = require('electron').ipcMain
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080'
  : `file://${__dirname}/index.html`

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    opacity: 1,
    minWidth: 1200,
    minHeight: 800,
    zoomFactor: 1,
    titleBarStyle: "customButtonsOnHover",
    show: false,
    webPreferences: {
      // webSecurity:false,
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
  // win.on('ready-to-show', function () {
  //   win.show() // 初始化后再显示
  // })
}


let desktopLylrc
function createDesktopLyirc() {
  desktopLylrc = new BrowserWindow({
    width: 800,
    height: 65,
    minimizable: false,
    fullscreenable: false,
    maximizable: false,
    resizable: false,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    // parent: win, //win是主窗口
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true
    },
    hasShadow: false,
  })
  desktopLylrc.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/back.html');
  desktopLylrc.on('closed', () => { desktopLylrc = null })

}

ipc.on("showlyirc", (event, val) => {
  if (desktopLylrc)
    val ? desktopLylrc.show() : desktopLylrc.hide()
  else createDesktopLyirc()
})
ipc.on("chageLyric", (e, message) => {
  if (desktopLylrc)
    desktopLylrc.webContents.send('showlyirc', message)
})
ipc.on("showMainWindow", (e, message) => {
  win.show()
})

ipc.on("loginIn", (e, msg) => {
  win.webContents.send('userLoginIn', msg)
})

let loginWindow
function createLoginWindw() {
  loginWindow = new BrowserWindow({
    width: 650,
    height: 400,
    minimizable: false,
    fullscreenable: false,
    maximizable: false,
    resizable: false,
    frame: false,
    titleBarStyle: "customButtonsOnHover",
    alwaysOnTop: true,
    // transparent: true,
    parent: win, //win是主窗口
    webPreferences: {
      // backgroundThrottling: false,
      nodeIntegration: true
    },
    // hasShadow: false,
  })
  loginWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/login.html');
  loginWindow.on('closed', () => { loginWindow = null })

}
ipc.on("showLoginWindow", (e, val) => {
  if (loginWindow)
    val ? loginWindow.show() : loginWindow.hide()
  else createLoginWindw()
})

ipc.on("offLoginWindow", (e, msg) => {
  loginWindow = null
})
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
