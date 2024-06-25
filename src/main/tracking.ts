import { writable, get } from 'svelte/store'

const isTracking = writable(false)
const trackingStart = null

function startTracking(): void {
  if (get(isTracking)) return
  trackingStart = Date.now()
  isTracking.set(true)

  // Start tracking
}

function stopTracking(): void {
  if (!isTracking) return
  isTracking.set(false)
  // Stop tracking
}

export { isTracking, startTracking, stopTracking }
