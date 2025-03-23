export function formatTime(time: number | null | undefined): string | null {
  if (typeof time !== 'number') {
    return null
  }

  if (time < 0) {
    return null
  }

  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60

  return `${minutes < 10 ? '0' + minutes.toString() : minutes}:${seconds < 10 ? '0' + seconds.toString() : seconds}`
}
