<script lang="ts">
  import type { TrackingRecord } from '../../../types/index.ts'
  import Timer from './Timer.svelte'

  export let record: TrackingRecord
</script>

{#key record}
  <div class="flex flex-wrap justify-between rounded p-2 m-1 bg-surface-900 text-white">
    <div>{record.label}</div>
    <div><Timer start={record.startTime} end={record.endTime} /></div>
  </div>
{/key}
