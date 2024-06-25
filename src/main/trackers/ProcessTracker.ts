import psList from 'ps-list'
import pidusage from 'pidusage'
import type { ProcessRecord } from '../../types'

class ProcessTracker {
  async parseProcess({ pid, name }: { pid: number; name: string }): Promise<ProcessRecord> {
    const stats = await pidusage(pid)
    return {
      activeAt: Date.now(),
      name,
      pid,
      cpu: stats.cpu,
      memory: stats.memory
    }
  }
  async flush(): Promise<Array<ProcessRecord>> {
    const list = await psList()
    const recordPromises = list.map((process) =>
      this.parseProcess({ pid: process.pid, name: process.name })
    )
    return await Promise.all(recordPromises)
  }
}

export default ProcessTracker
