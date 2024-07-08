import type { TrackingRecord } from '../types/index.ts'
import { JSONFilePreset } from 'lowdb/node'
import { Low } from 'lowdb/lib/core/Low.js'
import { randomUUID } from 'crypto'
import { getMainWindow } from './mainWindow'
import { isOlderThanDay } from './utils'

class Data {
  records: Array<TrackingRecord> = []
  currentRecord: TrackingRecord | null = null
  user: object | null = null
}

class Controller {
  static database: Low<Data>
  constructor(persistantData: Low<Data>) {
    Controller.database = persistantData
  }
  get data(): Data {
    return Controller.database.data
  }
  getHistory(): Array<TrackingRecord> {
    return this.data.records.filter((record) => !record.endTime || !isOlderThanDay(record.endTime))
  }
  updateMemo(memo: string): void {
    if (!this.data.currentRecord) return
    this.data.currentRecord.label = memo
    const mainWindow = getMainWindow()
    mainWindow.webContents.send('memo-updated', this.data.currentRecord)
    Controller.database.write()
  }
  startTracking(): void {
    if (this.data.currentRecord) return
    const recordCount = this.data.records.length
    this.data.currentRecord = {
      id: randomUUID(),
      label: `Session #${recordCount + 1}`,
      startTime: Date.now(),
      endTime: null
    }
    const mainWindow = getMainWindow()
    mainWindow.webContents.send('tracking-started', this.data.currentRecord)
  }
  stopTracking(): void {
    if (!this.data.currentRecord) return
    const currentRecord = this.data.currentRecord
    currentRecord.endTime = Date.now()
    this.data.records.push(currentRecord)
    this.data.currentRecord = null
    const mainWindow = getMainWindow()
    mainWindow.webContents.send('tracking-stopped', this.getHistory())
    Controller.database.write()
  }
}

const persistantData = await JSONFilePreset('data.json', new Data())

export default new Controller(persistantData)
