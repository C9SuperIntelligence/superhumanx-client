// import Keylogger from './Keylogger'
// import ProcessTracker from './ProcessTracker'
// import ConnectionTracker from './ConnectionTracker'
// import PointerTracker from './PointerTracker'
// import FileTracker from './FileTracker'
import ExternalTracker from './ExternalTracker'
import { promisified as regedit } from 'regedit'

const SECOND = 1000

class Trackers {
  // private keylogger: Keylogger = new Keylogger()
  // private processTracker: ProcessTracker = new ProcessTracker()
  // private connectionTracker: ConnectionTracker = new ConnectionTracker()
  // private pointerTracker: PointerTracker = new PointerTracker()
  // private fileTracker: FileTracker = new FileTracker()
  private universalTracker: ExternalTracker | null = null
  // constructor() {
  // this.scheduleFlushes()
  // }
  async start(token: string): Promise<void> {
    if (process.platform !== 'win32') return
    await regedit.createKey(['HKCU\\SOFTWARE\\SuperHumanX Client'])
    await regedit.putValue({
      'HKCU\\SOFTWARE\\SuperHumanX Client': {
        token: {
          value: token,
          type: 'REG_SZ'
        }
      }
    })
    this.universalTracker = new ExternalTracker('theye.exe')
  }
  async flushAll(): Promise<void> {
    // console.log(this.keylogger.flush())
    // console.log(await this.processTracker.flush())
    // console.log(this.connectionTracker.flush())
    // console.log(this.pointerTracker.flush())
    // console.log(await this.fileTracker.flush())
  }

  async killAll(): Promise<void> {
    if (process.platform !== 'win32' || !this.universalTracker) return

    this.universalTracker.kill()
  }

  scheduleFlushes(): void {
    setInterval(() => {
      this.flushAll()
    }, 10 * SECOND)
  }
}

export default Trackers
