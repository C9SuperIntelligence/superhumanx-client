import { type Writable, writable, get } from 'svelte/store'
import Trackers from './trackers'

const trackersStore: Writable<Trackers | null> = writable(null)

function startTracking(): void {
  const trackers = get(trackersStore)
  if (trackers) return
  trackersStore.set(new Trackers())

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
