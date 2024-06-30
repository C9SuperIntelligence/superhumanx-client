import { type Writable, writable, get } from 'svelte/store'
import Trackers from './trackers'
import auth0 from './auth'
import data from './data'

const trackersStore: Writable<Trackers | null> = writable(null)

async function startTracking(): Promise<void> {
  let trackers = get(trackersStore)
  if (trackers) return
  // let userToken: string
  // try {
  //   userToken = await auth0.getToken()
  // } catch (error) {
  //   console.error(error)
  //   return
  // }
  trackers = new Trackers()
  trackersStore.set(trackers)
  // trackers.start(userToken)
  data.startTracking()
}

function stopTracking(): void {
  const trackers = get(trackersStore)
  if (!trackers) return
  // trackers.killAll()
  trackersStore.set(null)
  data.stopTracking()
}

export { trackersStore, startTracking, stopTracking }
