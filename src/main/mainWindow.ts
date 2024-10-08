import { shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { get } from 'svelte/store'
import { accessTokenStore } from './authService'

let mainWindow

function createMainWindow(): BrowserWindow {
  if (import.meta.env.DEV) console.log(get(accessTokenStore))
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 300,
    height: 500,
    resizable: false,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.showInactive()
    // mainWindow.webContents.openDevTools()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  return mainWindow
}

function getMainWindow(): BrowserWindow {
  if (mainWindow) return mainWindow
  else return createMainWindow()
}

function closeMainWindow(): void {
  if (mainWindow) mainWindow.close()
}

export { createMainWindow, getMainWindow, closeMainWindow }
