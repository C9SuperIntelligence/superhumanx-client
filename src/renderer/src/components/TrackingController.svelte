<script lang="ts">
  import type { TrackingRecord } from '../../../types'
  import type { IpcRendererEvent } from 'electron'
  import Timer from './Timer.svelte'
  import Play from './icons/Play.svelte'
  import Stop from './icons/Stop.svelte'
  import { fade } from 'svelte/transition'

  let currentTracking: TrackingRecord | null = null
  let currentTime: number = 0

  function requestStartTracking(): void {
    window.electron.ipcRenderer.send('tracking-start')
  }
  function requestStopTracking(): void {
    window.electron.ipcRenderer.send('tracking-stop')
  }
  function handleTrackingStart(event: IpcRendererEvent, tracking: TrackingRecord): void {
    currentTracking = tracking
  }
  function handleTrackingStop(): void {
    currentTracking = null
  }
  function updateCurrentTime(): void {
    currentTime = Date.now()
  }
  function handleMemoChange(event: Event): void {
    const element = event.target as HTMLInputElement
    const value = element.value
    window.electron.ipcRenderer.send('tracking-memo', value)
  }

  setInterval(updateCurrentTime, 1000)
  window.electron.ipcRenderer.on('tracking-started', handleTrackingStart)
  window.electron.ipcRenderer.on('tracking-stopped', handleTrackingStop)
</script>

{#if currentTracking}
  <div class="flex flex-wrap justify-center">
    <h2 class="h2 w-auto text-center p-3 mt-3 bg-white text-black rounded" in:fade>
      <Timer start={currentTracking.startTime} end={currentTime} />
    </h2>

    <input
      class="input text-center bg-white text-black m-3 border-0"
      title="Input (text)"
      type="text"
      placeholder="Memo"
      on:change={handleMemoChange}
      in:fade
    />
    <button
      on:click={requestStopTracking}
      type="button"
      class="btn variant-filled rounded-full p-4 m-2"><Stop /></button
    >
  </div>
{:else}
  <button
    on:click={requestStartTracking}
    type="button"
    class="btn variant-filled rounded-full p-3 m-2"><Play /></button
  >
{/if}
