import { app, BrowserWindow } from 'electron'
import { createMainWindow } from './mainWindow'
import {
  getAuthenticationURL,
  loadTokens,
  logout,
  getLogOutUrl,
  failCount,
  auth
} from './authService'

let win: BrowserWindow | null = null

function createAuthWindow(): void {
  if (failCount > 5) app.quit()
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
    //if (!(await validateToken())) return createAuthWindow()
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
    auth.emit('loggedOut')
  })
}

export { createAuthWindow, createLogoutWindow }
