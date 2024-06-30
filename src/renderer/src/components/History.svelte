<script lang="ts">
  import type { TrackingRecord } from '../../../types/index.ts'
  import type { IpcRendererEvent } from 'electron'
  import Timer from './Timer.svelte'

  let history: Array<TrackingRecord> = []
  function updateHistory(event: IpcRendererEvent, newHistory: Array<TrackingRecord>): void {
    history = newHistory
  }
  window.electron.ipcRenderer.on('tracking-stopped', updateHistory)
  window.electron.ipcRenderer.on('history', updateHistory)
  window.electron.ipcRenderer.send('get-history')
</script>

<div class="h-full p-3">
  <h3 class="h3">Recent sessions:</h3>
  <div class="flex flex-col">
    {#each history as record (record.id)}
      <div class="flex flex-wrap justify-between rounded p-2 m-1 bg-surface-900 text-white">
        <div>{record.label}</div>
        <div><Timer start={record.startTime} end={record.endTime} /></div>
      </div>
    {/each}
  </div>
</div>
