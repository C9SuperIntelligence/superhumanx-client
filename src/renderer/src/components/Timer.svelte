<script lang="ts">
  export let start: number = 0
  export let end: number = 0
  let hours: string = '00'
  let minutes: string = '00'
  let seconds: string = '00'

  interface HoursMinutesSeconds {
    hours: string
    minutes: string
    seconds: string
  }

  function toTwoDigitString(time: number): string {
    return time.toString().padStart(2, '0')
  }

  function updateTimer(start: number, end: number): HoursMinutesSeconds {
    if (start >= end) return { hours: '00', minutes: '00', seconds: '00' }
    const elapsedTime = end - start
    const elapsedSeconds = Math.floor(elapsedTime / 1000)
    const hours = toTwoDigitString(Math.floor(elapsedSeconds / 3600))
    const minutes = toTwoDigitString(Math.floor((elapsedSeconds % 3600) / 60))
    const seconds = toTwoDigitString(elapsedSeconds % 60)
    return { hours, minutes, seconds }
  }
  $: {
    ;({ hours, minutes, seconds } = updateTimer(start, end))
  }
</script>

{hours}:{minutes}:{seconds}
