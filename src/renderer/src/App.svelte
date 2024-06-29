<script lang="ts">
  import History from './components/History.svelte'
  import TrackingController from './components/TrackingController.svelte'
</script>

<div class="h-full flex flex-col">
  <div class="flex-grow flex justify-center items-center">
    <TrackingController />
  </div>
  <hr />
  <div class="flex-grow-[2]">
    <History />
  </div>
</div>
