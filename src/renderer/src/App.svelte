<script lang="ts">
  import History from './components/History.svelte'
  import TrackingController from './components/TrackingController.svelte'
  import type { TrackingRecord } from '../../types/index.ts'
  import type { IpcRendererEvent } from 'electron'
  import Timer from './components/Timer.svelte'

  let history: Array<TrackingRecord> = []
  let totalTime: number = 0

  function updateHistory(_: IpcRendererEvent, newHistory: Array<TrackingRecord>): void {
    history = newHistory
  }
  function calculateTotalTime(history: Array<TrackingRecord>): number {
    return history.reduce((acc, record) => acc + record.endTime - record.startTime, 0)
  }

  window.electron.ipcRenderer.on('tracking-stopped', updateHistory)
  window.electron.ipcRenderer.on('history', updateHistory)
  window.electron.ipcRenderer.send('get-history')
  $: totalTime = calculateTotalTime(history)
</script>

<div class="h-full flex flex-col">
  <div class="flex-grow flex justify-center items-center">
    <TrackingController />
  </div>
  <hr />
  <div class="flex-grow-[2] p-3">
    <History {history} />
    <div class="text-center pb-1">
      Total for last 24 hours: <Timer start={0} end={totalTime} />
    </div>
  </div>
</div>
