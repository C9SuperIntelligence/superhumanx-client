import iohook from 'uiohook-napi'
import type { PointerRecord } from '../../types'

class PointerTracker {
  static buffer: Array<PointerRecord> = []
  constructor() {
    PointerTracker.buffer = []
    iohook.on('mousemove', PointerTracker.logMove)
    iohook.start()
  }
  static logMove(event: { x: number; y: number }): void {
    console.log(event)
    PointerTracker.buffer.push({
      pressedAt: Date.now(),
      x: event.x,
      y: event.y
    })
  }
  flush(): Array<PointerRecord> {
    const buffer = [...PointerTracker.buffer]
    PointerTracker.buffer = []
    return buffer
  }
}

export default PointerTracker
