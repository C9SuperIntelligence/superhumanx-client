<script lang="ts">
  import HistoryRecord from "./HistoryRecord.svelte"
  import type { TrackingRecord } from '../../../types/index.ts'

  export let history: Array<TrackingRecord>
</script>

<div class="h-full">
  <h3 class="h3 mb-2">Recent sessions:</h3>
  <div class="flex flex-col">
    {#each history.reverse() as record (record.id)}
        <HistoryRecord {record} />
    {/each}
  </div>
</div>
