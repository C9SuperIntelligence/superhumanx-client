import netstat from 'node-netstat'

class ConnectionTracker {
  private static connections: Array<object> = []
  constructor() {
    ConnectionTracker.connections = []
    this.track()
  }
  track(): void {
    netstat({}, (connection: object) => {
      ConnectionTracker.connections.push({
        estabilishedAt: Date.now(),
        localAddress: connection.local.address,
        localPort: connection.local.port,
        remoteAddress: connection.remote.address,
        remotePort: connection.remote.port,
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
