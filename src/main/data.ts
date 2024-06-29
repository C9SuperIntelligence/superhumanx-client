import type { TrackingRecord } from '../types/index.ts'
import { JSONFilePreset } from 'lowdb/node'
import { Low } from 'lowdb/lib/core/Low.js'
import { randomUUID } from 'crypto'
import { getMainWindow } from './mainWindow'

class Data {
  records: Array<TrackingRecord> = []
  currentRecord: TrackingRecord | null = null
  user: object | null = null
}

class Controller {
  static data: Low<Data>
  constructor(persistantData: Low<Data>) {
    Controller.data = persistantData
  }
  startTracking(): void {
    const data = Controller.data.data
    if (data.currentRecord) return
    const recordCount = data.records.length
    data.currentRecord = {
      id: randomUUID(),
      label: `Session #${recordCount + 1}`,
      startTime: Date.now(),
      endTime: null
    }
    const mainWindow = getMainWindow()
    mainWindow.webContents.send('tracking-started', data.currentRecord)
  }
  stopTracking(): void {
    const data = Controller.data.data
    if (!data.currentRecord) return
    const currentRecord = data.currentRecord
    currentRecord.endTime = Date.now()
    data.records.push(currentRecord)
    data.currentRecord = null
    const mainWindow = getMainWindow()
    mainWindow.webContents.send('tracking-stopped')
  }
}

const persistantData = await JSONFilePreset('data.json', new Data())

export default new Controller(persistantData)
