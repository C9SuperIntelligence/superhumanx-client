import { BrowserWindow } from 'electron'
import { getAuthenticationURL, loadTokens, logout, getLogOutUrl } from './authService'
// const createAppWindow = require('../main/app-process');

let win: BrowserWindow | null = null

function createAuthWindow(): void {
  destroyAuthWin()

  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false
    }
  })

  win.loadURL(getAuthenticationURL())

  const {
    session: { webRequest }
  } = win.webContents

  const filter = {
    urls: ['http://localhost/callback*']
  }

  webRequest.onBeforeRequest(filter, async ({ url }) => {
    await loadTokens(url)
    createAppWindow()
    return destroyAuthWin()
  })

  win.on('authenticated', () => {
    destroyAuthWin()
  })

  win.on('closed', () => {
    win = null
  })
}

function destroyAuthWin(): void {
  if (!win) return
  win.close()
  win = null
}

function createLogoutWindow(): void {
  const logoutWindow = new BrowserWindow({
    show: false
  })

  logoutWindow.loadURL(getLogOutUrl())

  logoutWindow.on('ready-to-show', async () => {
    await logout()
    logoutWindow.close()
  })
}

export { createAuthWindow, createLogoutWindow }
