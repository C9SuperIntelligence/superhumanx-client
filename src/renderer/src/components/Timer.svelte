<script lang="ts">
  export let start: number = 0
  let hours: string = '00'
  let minutes: string = '00'
  let seconds: string = '00'

  function toTwoDigitString(time: number): string {
    return time.toString().padStart(2, '0')
  }

  function updateTimer(): void {
    const currentTime = Date.now()
    const elapsedTime = currentTime - start
    const elapsedSeconds = Math.floor(elapsedTime / 1000)
    hours = toTwoDigitString(Math.floor(elapsedSeconds / 3600))
    minutes = toTwoDigitString(Math.floor((elapsedSeconds % 3600) / 60))
    seconds = toTwoDigitString(elapsedSeconds % 60)
  }

  setInterval(updateTimer, 1000)
</script>

<h2 class="h2 w-full text-center">{hours}:{minutes}:{seconds}</h2>
