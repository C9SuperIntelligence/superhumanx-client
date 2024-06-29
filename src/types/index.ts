interface TrackingRecord<Finished extends boolean = boolean> {
  id: string
  label: string
  startTime: number
  endTime: Finished extends true ? number : null
  // screenshotIds: Array<string>
}

interface ConnectionRecord {
  establishedAt: number
  localAddress: string
  localPort: number
  remoteAddress: string
  remotePort: number
  state: string
  pid: number
  protocol: string
}

interface Keypress {
  key: string
  pressedAt: number
}

interface ProcessRecord {
  activeAt: number
  name: string
  pid: number
  cpu: number
  memory: number
}

interface PointerRecord {
  pressedAt: number
  x: number
  y: number
}

interface FileRecord {
  openedAt: number
  path: string
  processName: string
}

export type { TrackingRecord, ConnectionRecord, Keypress, ProcessRecord, PointerRecord, FileRecord }
