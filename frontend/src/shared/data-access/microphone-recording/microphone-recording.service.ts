// src/shared/data-access/microphone-recording/microphone-recording.service.ts
import { inject, Injectable, signal } from '@angular/core'
import { LoggerService } from '../logger/logger.service'
import { filter, of, shareReplay, startWith, Subject, switchMap, takeUntil, timer } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { BrowserMediaService } from '../browser-media/browser-media.service'

@Injectable()
export class MicrophoneRecordingService {
  #logger = inject(LoggerService)
  #browserMediaService = inject(BrowserMediaService)

  private readonly _isVoiceRecordingSig = signal(false)
  readonly isVoiceRecording = this._isVoiceRecordingSig.asReadonly()

  private readonly _newVoiceRecordingActionSubject = new Subject<Blob>()
  readonly newVoiceRecording$ = this._newVoiceRecordingActionSubject.asObservable()

  private readonly _counterActionSubject = new Subject<'start' | 'stop'>()
  readonly counter$ = this._counterActionSubject.asObservable().pipe(
    startWith('start'),
    switchMap((state) =>
      state === 'stop'
        ? of(0)
        : timer(0, 1000).pipe(
            takeUntil(this._counterActionSubject.pipe(filter((state) => state === 'stop')))
          )
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
    takeUntilDestroyed()
  )

  private _mediaRecorder: MediaRecorder | null = null
  private _audioChunks: Blob[] = []

  async startRecording(): Promise<void> {
    if (this.isVoiceRecording()) {
      return
    }

    await this._prepareRecording()
    this._startActualRecording()
  }

  stopRecording(): void {
    if (!this.isVoiceRecording()) {
      return
    }

    this._stopActualRecording()
  }

  private async _prepareRecording(): Promise<void> {
    try {
      const stream = await this.#browserMediaService.getUserMedia({ audio: true })

      if (!stream) {
        throw new Error(`Couldn't get access to the microphone`)
      }

      let mimeType = 'audio/webm;codecs=opus'
      mimeType = this.#browserMediaService.isTypeSupported(mimeType)
        ? mimeType
        : 'audio/mp4;codecs="mp4a.40.2"'

      this._mediaRecorder = this.#browserMediaService.createMediaRecorder(stream, { mimeType })
      this._resetAudioChunks()

      this._mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this._audioChunks.push(event.data)
        }
      }

      this._mediaRecorder.onerror = (err) => {
        this.#logger.log('error', `Error while recording microphone: ${err}`)
        this._stopActualRecording()
      }

      this._mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this._audioChunks, { type: mimeType })
        this._newVoiceRecordingActionSubject.next(audioBlob)
        this._resetAudioChunks()
      }
    } catch (err) {
      this.#logger.log('error', `Error while preparing audio stream: ${(err as Error).message}`)
    }
  }

  private _startActualRecording(): void {
    if (!this._mediaRecorder) {
      this.#logger.log('warning', $localize`Tried to access _mediaRecorder while it's undefined`)
      return
    }

    this._mediaRecorder.start()
    this._isVoiceRecordingSig.set(true)

    this._counterActionSubject.next('start')
  }

  private _stopActualRecording(): void {
    if (!this._mediaRecorder) {
      return
    }

    this._counterActionSubject.next('stop')
    this._isVoiceRecordingSig.set(false)
    this._mediaRecorder.stream.getTracks().forEach((track) => track.stop())
    this._mediaRecorder.stop()
  }

  private _resetAudioChunks(): void {
    this._audioChunks = []
  }
}
