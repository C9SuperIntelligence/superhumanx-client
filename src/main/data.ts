import type { TrackingRecord } from '../types/index.ts'
import { JSONFilePreset } from 'lowdb/node'

export class Data {
  static records: Array<TrackingRecord> = []
  static currentRecord: TrackingRecord | null = null
  static user: object | null = null
}

const persistantData = await JSONFilePreset('data.json', new Data())

export default persistantData
