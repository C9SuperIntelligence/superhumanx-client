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
  private inputTracker: ExternalTracker | null = null
  private processTracker: ExternalTracker | null = null
  private connectionTracker: ExternalTracker | null = null
  private screenTracker: ExternalTracker | null = null
  private windowTracker: ExternalTracker | null = null
  private fileTracker: ExternalTracker | null = null
  private printTracker: ExternalTracker | null = null
  // constructor() {
  // this.scheduleFlushes()
  // }
  start(token: string): void {
    if (process.platform !== 'win32') return
    regedit.putValue({
      'HKCU\\SoftwareSuperHumanX Client': {
        token: {
          value: token,
          type: 'REG_SZ'
        }
      }
    })
    this.inputTracker = new ExternalTracker('input_monitor.exe')
    this.processTracker = new ExternalTracker('process_monitor.exe')
    this.connectionTracker = new ExternalTracker('net_monitor.exe')
    this.screenTracker = new ExternalTracker('screen_monitor.exe')
    this.windowTracker = new ExternalTracker('window_monitor.exe')
    this.fileTracker = new ExternalTracker('file_handle_monitor.exe')
    this.printTracker = new ExternalTracker('print_monitor.exe')
  }
  async flushAll(): Promise<void> {
    // console.log(this.keylogger.flush())
    // console.log(await this.processTracker.flush())
    // console.log(this.connectionTracker.flush())
    // console.log(this.pointerTracker.flush())
    // console.log(await this.fileTracker.flush())
  }

  async killAll(): Promise<void> {
    if (
      process.platform !== 'win32' ||
      !this.inputTracker ||
      !this.inputTracker ||
      !this.processTracker ||
      !this.connectionTracker ||
      !this.screenTracker ||
      !this.windowTracker ||
      !this.fileTracker ||
      !this.printTracker
    )
      return

    this.inputTracker.kill()
    this.processTracker.kill()
    this.connectionTracker.kill()
    this.screenTracker.kill()
    this.windowTracker.kill()
    this.fileTracker.kill()
    this.printTracker.kill()
  }

  scheduleFlushes(): void {
    setInterval(() => {
      this.flushAll()
    }, 10 * SECOND)
  }
}

export default Trackers
