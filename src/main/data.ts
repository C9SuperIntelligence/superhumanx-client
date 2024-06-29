import type { TrackingRecord } from '../types/index.ts'
import { JSONFilePreset } from 'lowdb/node'

export class Data {
  static records: Array<TrackingRecord> = []
  static currentRecord: TrackingRecord | null = null
  static user: object | null = null
  startTracking(): void {
    if (Data.currentRecord) return
    const recordCount = Data.records.length
    Data.currentRecord = {
      id: crypto.randomUUID(),
      label: `Session #${recordCount + 1}`,
      startTime: Date.now(),
      endTime: null
    }
  }
  stopTracking(): void {
    if (!Data.currentRecord) return
    const currentRecord = Data.currentRecord
    currentRecord.endTime = Date.now()
    Data.records.push(currentRecord)
    Data.currentRecord = null
  }
}

const persistantData = await JSONFilePreset('data.json', new Data())

export default persistantData
