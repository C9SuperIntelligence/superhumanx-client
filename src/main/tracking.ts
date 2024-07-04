import { type Writable, writable, get } from 'svelte/store'
import Trackers from './trackers'
// import auth0 from './auth'
import data from './data'
import { getAccessToken } from './authService'

const trackersStore: Writable<Trackers | null> = writable(null)

async function startTracking(): Promise<void> {
  let trackers = get(trackersStore)
  if (trackers) return
  const userToken = getAccessToken() as string
  trackers = new Trackers()
  trackersStore.set(trackers)
  trackers.start(userToken)
  data.startTracking()
}

function stopTracking(): void {
  const trackers = get(trackersStore)
  if (!trackers) return
  trackers.killAll()
  trackersStore.set(null)
  data.stopTracking()
}

export { trackersStore, startTracking, stopTracking }
