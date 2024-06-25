import Keylogger from './Keylogger'

const SECOND = 1000

class Trackers {
  private keylogger: Keylogger = new Keylogger()
  flushAll(): void {
    console.log(this.keylogger.flush())
  }

  scheduleFlushes(): void {
    setInterval(this.flushAll, 10 * SECOND)
  }
}

export default Trackers
