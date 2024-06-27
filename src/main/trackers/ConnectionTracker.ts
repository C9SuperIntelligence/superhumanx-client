import netstat from 'node-netstat'
import type { ConnectionRecord } from '../../types'

class ConnectionTracker {
  private static connections: Array<ConnectionRecord> = []
  constructor() {
    ConnectionTracker.connections = []
    this.track()
  }
  track(): void {
    netstat({}, (connection) => {
      ConnectionTracker.connections.push({
        establishedAt: Date.now(),
        localAddress: connection.local.address as string,
        localPort: connection.local.port as number,
        remoteAddress: connection.remote.address as string,
        remotePort: connection.remote.port as number,
        state: connection.state,
        pid: connection.pid,
        protocol: connection.protocol
      })
    })
  }

  flush(): Array<object> {
    const connections = [...ConnectionTracker.connections]
    ConnectionTracker.connections = []
    this.track()
    return connections
  }
}

export default ConnectionTracker
