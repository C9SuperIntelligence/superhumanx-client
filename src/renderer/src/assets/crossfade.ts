import { crossfade } from 'svelte/transition'
import { quintOut } from 'svelte/easing'

const [send, receive] = crossfade({
  duration: 1500,
  easing: quintOut
})

export { send, receive }
