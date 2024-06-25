import { writable, get } from 'svelte/store'

const isTracking = writable(false)

function startTracking(): void {
  if (get(isTracking)) return
  isTracking.set(true)

  // Start tracking
}

function stopTracking(): void {
  if (!isTracking) return
  isTracking.set(false)
  // Stop tracking
}

export { isTracking, startTracking, stopTracking }
