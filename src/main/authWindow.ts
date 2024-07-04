import { BrowserWindow } from 'electron'
import { createMainWindow } from './mainWindow'
import { getAuthenticationURL, loadTokens, logout, getLogOutUrl } from './authService'

let win: BrowserWindow | null = null

function createAuthWindow(): void {
  destroyAuthWin()

  win = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: false,
    autoHideMenuBar: true,
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
    createMainWindow()
    return destroyAuthWin()
  })

  // @ts-ignore: This can happen
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
