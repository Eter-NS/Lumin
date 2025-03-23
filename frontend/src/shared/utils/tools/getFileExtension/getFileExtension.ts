export function getFileExtension(file: File): string | null {
  if (!(file instanceof File)) {
    return null
  }

  // Try to get the extension from the file name
  const fileName = file.name
  const nameExtensionRegex = /(?:\.([0-9a-z]+)(?:[?#]|$))/i
  const nameMatchResult = fileName.match(nameExtensionRegex)

  if (nameMatchResult && nameMatchResult[1]) {
    return nameMatchResult[1].toLowerCase()
  }

  // If no extension in name, try to get it from the MIME type
  const mimeType = file.type
  if (mimeType) {
    const mimeTypeParts = mimeType.split('/')
    if (mimeTypeParts.length === 2) {
      const mimeSubType = mimeTypeParts[1].toLowerCase()
      switch (mimeSubType) {
        case 'jpeg':
          return 'jpg'
        case 'png':
          return 'png'
        case 'gif':
          return 'gif'
        case 'bmp':
          return 'bmp'
        case 'webp':
          return 'webp'
        case 'pdf':
          return 'pdf'
        case 'msword':
          return 'doc'
        case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
          return 'docx'
        case 'vnd.ms-excel':
          return 'xls'
        case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          return 'xlsx'
        case 'vnd.ms-powerpoint':
          return 'ppt'
        case 'vnd.openxmlformats-officedocument.presentationml.presentation':
          return 'pptx'
        case 'plain':
          return 'txt'
        case 'csv':
          return 'csv'
        case 'svg+xml':
          return 'svg'
        case 'json':
          return 'json'
        case 'xml':
          return 'xml'
        case 'mpeg':
          return 'mpeg'
        case 'mp4':
          return 'mp4'
        case 'webm':
          return 'webm'
        case 'ogg':
          return 'ogg'
        case 'wav':
          return 'wav'
        case 'aac':
          return 'aac'
      }
    }
  }

  return null
}
