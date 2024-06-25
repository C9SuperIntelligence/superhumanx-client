interface TrackingRecord<Finished extends boolean = boolean> {
  id: string
  label: string
  startTime: number
  endTime: Finished extends true ? number : null
  screenshotIds: Array<string>
}

export type { TrackingRecord }
