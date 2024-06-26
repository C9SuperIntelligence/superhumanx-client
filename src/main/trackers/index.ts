import Keylogger from './Keylogger'
import ProcessTracker from './ProcessTracker'
import ConnectionTracker from './ConnectionTracker'

const SECOND = 1000

class Trackers {
  private keylogger: Keylogger = new Keylogger()
  private processTracker: ProcessTracker = new ProcessTracker()
  private connectionTracker: ConnectionTracker = new ConnectionTracker()
  constructor() {
    this.scheduleFlushes()
  }
  async flushAll(): Promise<void> {
    console.log(this.keylogger.flush())
    console.log(await this.processTracker.flush())
    console.log(this.connectionTracker.flush())
  }

  scheduleFlushes(): void {
    setInterval(() => {
      this.flushAll()
    }, 10 * SECOND)
  }
}

export default Trackers
