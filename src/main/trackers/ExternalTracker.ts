import { spawn } from 'child_process'
import { join } from 'path'

class ExternalTracker {
  private pid: number
  constructor(executable: string) {
    console.log(`Tracking external process: ${executable}`)
    const executablePath = join(__dirname, '..', '..', 'resources', executable)
    this.pid = spawn(executablePath).pid as number
  }
  public kill(): void {
    console.log('Killing external process')
    process.kill(-this.pid)
  }
}

export default ExternalTracker
