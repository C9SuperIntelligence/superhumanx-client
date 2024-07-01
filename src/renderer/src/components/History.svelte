<script lang="ts">
  import type { TrackingRecord } from '../../../types/index.ts'
  import HistoryRecord from './HistoryRecord.svelte'
  import Timer from '../components/Timer.svelte'

  export let history: Array<TrackingRecord>
  export let totalTime: number
</script>

<div class="h-full flex flex-col">
  <h3 class="h3 mb-2">Recent sessions:</h3>
  <div class="flex-grow flex flex-col">
    {#each history.reverse() as record (record.id)}
      <HistoryRecord {record} />
    {/each}
    <div class="text-center text-gray-500 pb-1 mt-auto">
      Total for last 24 hours: <Timer start={0} end={totalTime} />
    </div>
  </div>
</div>
