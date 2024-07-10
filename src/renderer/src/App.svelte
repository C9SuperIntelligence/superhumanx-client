<script lang="ts">
  import type { TrackingRecord } from '../../types/index.ts'
  import type { IpcRendererEvent } from 'electron'
  import History from './components/History.svelte'
  import TrackingController from './components/TrackingController.svelte'

  let history: Array<TrackingRecord> = []
  let totalTime: number = 0
  let version: string = ''

  function updateHistory(_: IpcRendererEvent, newHistory: Array<TrackingRecord>): void {
    history = newHistory
  }
  function calculateTotalTime(history: Array<TrackingRecord>): number {
    return history.reduce((acc, record) => acc + record.endTime - record.startTime, 0)
  }
  function setVersion(_: IpcRendererEvent, versionData: string): void {
    version = versionData
  }

  window.electron.ipcRenderer.on('tracking-stopped', updateHistory)
  window.electron.ipcRenderer.on('history', updateHistory)
  window.electron.ipcRenderer.on('version', setVersion)
  window.electron.ipcRenderer.send('get-history')
  window.electron.ipcRenderer.send('get-version')
  $: totalTime = calculateTotalTime(history)
</script>

<svelte:head>
  <title>SuperHumanˣ {version}</title>
</svelte:head>

<div class="h-full flex flex-col">
  <div class="min-h-[33%] flex justify-center items-center">
    <TrackingController />
  </div>
  <div class="flex-grow p-3">
    <History {history} {totalTime} />
  </div>
</div>
