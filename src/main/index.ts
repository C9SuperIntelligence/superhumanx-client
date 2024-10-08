import { app, BrowserWindow, ipcMain, crashReporter } from 'electron'
import { electronApp, optimizer /*, is*/ } from '@electron-toolkit/utils'
import { createTrayAndMenu } from './tray'
import { startTracking, stopTracking } from './tracking'
import data from './data'
import { closeMainWindow, createMainWindow } from './mainWindow'
import { createAuthWindow } from './authWindow'
import { auth } from './authService'
import { setUpUpdater } from './updater'

function setUpCrashReporter(): void {
  crashReporter.start({
    submitURL: 'https://example.com/crash-report',
    productName: 'YourProductName',
    uploadToServer: true
  })
}

// async function initAuth(): Promise<void> {
//   userToken = await auth0.getToken()
// }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('tracking-start', startTracking)
  ipcMain.on('tracking-stop', stopTracking)
  ipcMain.on('get-history', (event) => {
    const history = data.getHistory()
    event.reply('history', history)
  })
  ipcMain.on('tracking-memo', (_, memo) => {
    data.updateMemo(memo)
  })
  ipcMain.on('get-version', (event) => {
    event.reply('version', app.getVersion())
  })

  auth.on('loggedIn', createMainWindow)
  auth.on('loggedOut', () => {
    stopTracking()
    closeMainWindow()
    createAuthWindow()
  })

  auth.emit('init')

  createTrayAndMenu()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
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

setUpCrashReporter()
setUpUpdater()
