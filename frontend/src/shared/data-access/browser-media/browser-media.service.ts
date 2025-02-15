import { inject, Injectable } from '@angular/core'
import { LoggerService } from '../logger/logger.service'

@Injectable({
  providedIn: 'root',
})
export class BrowserMediaService {
  #logger = inject(LoggerService)

  isTypeSupported(type: string) {
    return MediaRecorder.isTypeSupported(type)
  }

  async getUserMedia(constraints?: MediaStreamConstraints): Promise<MediaStream | null> {
    try {
      return await navigator.mediaDevices.getUserMedia(constraints)
    } catch (err) {
      this.#logger.log('error', `Error while accessing microphone: ${(err as Error).message}`)

      return null
    }
  }

  createMediaRecorder(stream: MediaStream, options?: MediaRecorderOptions): MediaRecorder {
    return new MediaRecorder(stream, options)
  }
}
