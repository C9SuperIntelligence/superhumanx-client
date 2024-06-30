<script lang="ts">
  import type { TrackingRecord } from '../../../types/index.ts'
  import Timer from './Timer.svelte'

  export let history: Array<TrackingRecord>
</script>

<div class="h-full">

  <h3 class="h3 mb-2">Recent sessions:</h3>
  <div class="flex flex-col">
    {#each history.reverse() as record (record.id)}
      <div class="flex flex-wrap justify-between rounded p-2 m-1 bg-surface-900 text-white">
        <div>{record.label}</div>
        <div><Timer start={record.startTime} end={record.endTime} /></div>
      </div>
    {/each}
  </div>
</div>
