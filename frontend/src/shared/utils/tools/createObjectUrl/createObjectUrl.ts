export function createObjectUrl(blob: Blob | MediaSource) {
  if (blob instanceof Blob || blob instanceof MediaSource) {
    return URL.createObjectURL(blob)
  }

  return null
}
