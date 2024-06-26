import { type Writable, writable, get } from 'svelte/store'
import Trackers from './trackers'
import auth0 from './auth'

const trackersStore: Writable<Trackers | null> = writable(null)

async function startTracking(): Promise<void> {
  const trackers = get(trackersStore)
  if (trackers) return
  trackersStore.set(new Trackers())
  const userToken = await auth0.getToken()
  trackers.start(userToken)

  // TODO: IPC notice
}

function stopTracking(): void {
  const trackers = get(trackersStore)
  if (!trackers) return
  trackers.killAll()
  trackersStore.set(null)

  // TODO: IPC notice
}

export { trackersStore, startTracking, stopTracking }
