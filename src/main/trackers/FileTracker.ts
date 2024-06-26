import type { FileRecord } from '../../types'
import { exec as execCb } from 'child_process'
import { platform } from 'os'
import { promisify } from 'util'

const exec = promisify(execCb)

class FileTracker {
  private buffer: Array<FileRecord> = []

  get command(): string {
    switch (platform()) {
      case 'win32':
        return 'handle'
      case 'linux':
      case 'darwin':
        return 'lsof'
      default:
        console.error('Unsupported platform')
        return ''
    }
  }

  get pathIndex(): number {
    return this.command === 'handle' ? 8 : 10
  }

  get processNameIndex(): number {
    return this.command === 'handle' ? 9 : 8
  }

  parseRecord(line: string): FileRecord {
    const parts = line.split(/\s+/)
    return {
      openedAt: Date.now(),
      path: parts[this.pathIndex],
      processName: parts[this.processNameIndex]
    }
  }

  async flush(): Promise<Array<FileRecord>> {
    if (this.command === '') return []
    try {
      const { stdout, stderr } = await exec(this.command, { maxBuffer: 1024 * 1024 * 1000 })
      const lines = stdout.split('\n')
      console.log(lines)
      this.buffer = lines.map(this.parseRecord)
      console.error(`stderr: ${stderr}`)
    } catch (error) {
      console.error(`exec error: ${error}`)
    }
    const buffer = [...this.buffer]
    this.buffer = []
    return buffer
  }
}

export default FileTracker
