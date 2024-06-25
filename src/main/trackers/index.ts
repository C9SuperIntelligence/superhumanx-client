import Keylogger from './Keylogger'
import ProcessTracker from './ProcessTracker'

const SECOND = 1000

class Trackers {
  private keylogger: Keylogger = new Keylogger()
  private processTracker: ProcessTracker = new ProcessTracker()
  constructor() {
    this.scheduleFlushes()
  }
  async flushAll(): Promise<void> {
    console.log(this.keylogger.flush())
    console.log(await this.processTracker.flush())
  }

  scheduleFlushes(): void {
    setInterval(() => {
      this.flushAll()
    }, 10 * SECOND)
  }
}

export default Trackers
