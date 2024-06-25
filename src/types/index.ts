interface TrackingRecord<Finished extends boolean = boolean> {
  id: string
  label: string
  startTime: number
  endTime: Finished extends true ? number : null
  screenshotIds: Array<string>
}

interface Keypress {
  key: string
  pressedAt: number
}

export type { TrackingRecord, Keypress }
