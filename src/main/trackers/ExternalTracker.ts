import { type ChildProcess, spawn } from 'child_process'
import { join } from 'path'

class ExternalTracker {
  private process: ChildProcess
  constructor(executable: string) {
    console.log(`Tracking external process: ${executable}`)
    const executablePath = join(__dirname, '..', '..', 'resources', executable)
    this.process = spawn(executablePath)
  }
  public kill(): void {
    console.log('Killing external process')
    this.process.kill()
  }
}

export default ExternalTracker
