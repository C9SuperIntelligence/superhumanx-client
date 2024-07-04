import { type Writable, writable, get } from 'svelte/store'
import Trackers from './trackers'
import data from './data'
import { getAccessToken } from './authService'
import { Notification } from 'electron/main'

const trackersStore: Writable<Trackers | null> = writable(null)

async function startTracking(): Promise<void> {
  let trackers = get(trackersStore)
  if (trackers) return
  const userToken = getAccessToken()
  if (!userToken) {
    const notification = new Notification({
      title: 'Required to login',
      body: 'In order to start tracking, you need to login first.'
    })
    notification.show()
    return
  }
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
