import { app, autoUpdater, BrowserWindow, ipcMain, crashReporter } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { createTrayAndMenu } from './tray'
import mainWindow from './mainWindow'
// import data from './data'
import { createAuthWindow } from './authWindow'
// import auth0 from './auth'

function tryUpdateApp(): void {
  if (is.dev) return

  autoUpdater.setFeedURL({
    url: `https://example.com/update/${process.platform}/${app.getVersion()}`
  })

  autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall()
  })

  autoUpdater.checkForUpdates()
}

function setUpCrashReporter(): void {
  crashReporter.start({
    submitURL: 'https://example.com/crash-report',
    productName: 'YourProductName',
    uploadToServer: true
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  createTrayAndMenu()
  mainWindow()
  createAuthWindow()
  // ;(async (): Promise<void> => {
  //   const token = await auth0.getToken()
  //   console.log('token', token)
  // })()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) mainWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.hide()
//   }
// })
//

tryUpdateApp()
setUpCrashReporter()
