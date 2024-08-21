import { NsisUpdater, type AppUpdater } from 'electron-updater'

function setUpUpdater(): void {
  let updater: AppUpdater
  if (process.platform === 'win32') updater = new NsisUpdater()
  else return
  setInterval(
    () => {
      updater.checkForUpdatesAndNotify()
    },
    10 * 60 * 1000
  )
}

export { setUpUpdater }
