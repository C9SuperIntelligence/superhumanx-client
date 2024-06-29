import { Tray, Menu, type MenuItemConstructorOptions, nativeImage } from 'electron'
import appIcon from '../../build/icon.png?asset'
import { trackersStore, startTracking, stopTracking } from './tracking'
import { app } from 'electron/main'

let tray: Tray | null = null
const statusMenuItem: MenuItemConstructorOptions = {
  label: 'Status: Not tracking',
  type: 'normal',
  click: (): void => {
    app.focus()
  }
}
const separatorMenuItem: MenuItemConstructorOptions = {
  type: 'separator'
}
const startTrackingMenuItem: MenuItemConstructorOptions = {
  label: 'Start tracking',
  type: 'normal',
  enabled: true,
  click: startTracking
}
const stopTrackingMenuItem: MenuItemConstructorOptions = {
  label: 'Stop tracking',
  type: 'normal',
  enabled: true,
  click: stopTracking
}
const exitMenuItem: MenuItemConstructorOptions = {
  label: 'Exit',
  type: 'normal',
  click: (): void => {
    app.quit()
  }
}
const menuTemplate = [
  statusMenuItem,
  separatorMenuItem,
  startTrackingMenuItem,
  stopTrackingMenuItem,
  exitMenuItem
]

let menu = Menu.buildFromTemplate(menuTemplate)

export function createTrayAndMenu(): void {
  tray = new Tray(nativeImage.createFromPath(appIcon))
  tray.setToolTip('SuperhumanX')
  tray.setContextMenu(menu)
  trackersStore.subscribe((value) => {
    if (value) {
      statusMenuItem.label = 'Status: Tracking'
      startTrackingMenuItem.enabled = false
      stopTrackingMenuItem.enabled = true
    } else {
      statusMenuItem.label = 'Status: Not tracking'
      startTrackingMenuItem.enabled = true
      stopTrackingMenuItem.enabled = false
    }
    menu = Menu.buildFromTemplate(menuTemplate)
    if (tray) tray.setContextMenu(menu)
  })
}
