<script lang="ts">
  import type { TrackingRecord } from '../../../types'
  import type { IpcRendererEvent } from 'electron'
  import Timer from './Timer.svelte'
  import Play from './icons/Play.svelte'
  import Stop from './icons/Stop.svelte'

  let currentTracking: TrackingRecord | null = null

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

  window.electron.ipcRenderer.on('tracking-started', handleTrackingStart)
  window.electron.ipcRenderer.on('tracking-stopped', handleTrackingStop)
</script>

{#if currentTracking}
  <div class="flex flex-wrap justify-center">
    <Timer start={currentTracking.startTime} />
    <input
      class="input text-center m-3 border-0"
      title="Input (text)"
      type="text"
      placeholder="Memo"
    />
    <button on:click={requestStopTracking} type="button" class="btn variant-filled"><Stop /></button
    >
  </div>
{:else}
  <button on:click={requestStartTracking} type="button" class="btn variant-filled"><Play /></button>
{/if}
