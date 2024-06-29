<script lang="ts">
  export let start: number = 0
  let hours: number = 0
  let minutes: number = 0
  let seconds: number = 0

  function updateTimer(): void {
    const currentTime = Date.now()
    const elapsedTime = currentTime - start
    const elapsedSeconds = Math.floor(elapsedTime / 1000)
    hours = Math.floor(elapsedSeconds / 3600)
    minutes = Math.floor((elapsedSeconds % 3600) / 60)
    seconds = Math.floor(elapsedSeconds % 60)
  }

  setInterval(updateTimer, 1000)
</script>

{hours}:{minutes}:{seconds}
