/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing'
import { MicrophoneRecordingService } from './microphone-recording.service'
import { LoggerService } from '../logger/logger.service'
import { Provider } from '@angular/core'
import { BrowserMediaService } from '../browser-media/browser-media.service'
import { firstValueFrom } from 'rxjs'

type MediaRecorderCallbackFunction = ((this: MediaRecorder, ev: BlobEvent) => any) | null
type MediaRecorderCallbacks = 'ondataavailable' | 'onerror' | 'onstop'

function configureService(browserMediaServiceMock = {}) {
  TestBed.configureTestingModule({
    providers: [
      {
        provide: BrowserMediaService,
        useValue: browserMediaServiceMock,
      },
      {
        provide: LoggerService,
        useValue: loggerMock,
      },
      MicrophoneRecordingService,
    ] as Provider[],
  })
  return TestBed.inject(MicrophoneRecordingService)
}

// Mocks
let mediaRecorderMockOptions: MediaRecorderOptions | undefined = undefined
const loggerMock = {
  log: jest.fn((x: string, y: string) => {
    x
    y
  }),
}

function createBrowserMediaServiceMock(config: {
  getUserMediaMockValue?: any
  isTypeSupportedValue?: boolean
}) {
  const controller = {
    subscribers: [] as {
      fn: MediaRecorderCallbackFunction
      source: MediaRecorderCallbacks
    }[],
    addSubscriber(source: MediaRecorderCallbacks, sub: MediaRecorderCallbackFunction) {
      this.subscribers.push({ source, fn: sub })
    },
    pushEvent(type: MediaRecorderCallbacks) {
      for (const { fn, source } of this.subscribers) {
        if (typeof fn === 'function' && source === type) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          fn({ data: { size: 1 } } as BlobEvent)
        }
      }
    },
  }

  const getUserMediaMock = jest
    .fn()
    .mockResolvedValue('getUserMediaMockValue' in config ? config.getUserMediaMockValue : {})

  const mediaRecorder = {
    ondataavailable: null,
    onerror: null,
    onstop: null,
    _onData: null as MediaRecorderCallbackFunction,
    _onError: null as MediaRecorderCallbackFunction,
    _onStop: null as MediaRecorderCallbackFunction,
  }

  const createMediaRecorder = jest.fn((stream: unknown, options: MediaRecorderOptions) => {
    mediaRecorderMockOptions = options

    return {
      get ondataavailable() {
        return mediaRecorder._onData
      },
      set ondataavailable(value) {
        mediaRecorder._onData = value
        if (typeof value === 'function') {
          controller.addSubscriber('ondataavailable', value)
        }
      },
      get onerror() {
        return mediaRecorder._onError
      },
      set onerror(value) {
        mediaRecorder._onError = value
        if (typeof value === 'function') {
          controller.addSubscriber('onerror', value)
        }
      },
      get onstop() {
        return mediaRecorder._onStop
      },
      set onstop(value) {
        mediaRecorder._onStop = value
        if (typeof value === 'function') {
          controller.addSubscriber('onstop', value)
        }
      },
    }
  })

  return {
    mock: {
      getUserMedia: getUserMediaMock,
      isTypeSupported: jest
        .fn()
        .mockReturnValue(
          'isTypeSupportedValue' in config && typeof config.isTypeSupportedValue === 'boolean'
            ? config.isTypeSupportedValue
            : false
        ),
      createMediaRecorder,
    },
    controller,
  }
}

describe('MicrophoneRecordingService', () => {
  // Service
  let service: MicrophoneRecordingService

  beforeEach(() => {
    jest.resetAllMocks()

    mediaRecorderMockOptions = undefined
  })

  it('should be created', () => {
    service = configureService()

    expect(service).toBeTruthy()
  })

  describe('counter$', () => {
    it('should emit start state initially.', async () => {
      // Arrange
      service = configureService()

      // Act & Assert
      expect(await firstValueFrom(service.counter$)).toEqual(0)
    })

    it('should emit counter values every second until stopped.', () => {
      // Arrange
      service = configureService()
      jest.useFakeTimers()
      const emittedValues: number[] = []

      const subscription = service.counter$.subscribe((value) => {
        emittedValues.push(value)
      })

      // Act & Assert
      service['_counterActionSubject'].next('start')

      jest.advanceTimersByTime(1000)
      expect(emittedValues).toEqual([0, 1])

      jest.advanceTimersByTime(1000)
      expect(emittedValues).toEqual([0, 1, 2])

      // Teardown
      service['_counterActionSubject'].next('stop')
      subscription.unsubscribe()
    })
  })

  describe('startRecording()', () => {
    it('should start recording if not already recording.', async () => {
      // Arrange
      service = configureService()
      const prepareRecordingSpy = jest
        .spyOn(service as any, '_prepareRecording')
        .mockResolvedValueOnce(undefined)
      const startRecordingSpy = jest
        .spyOn(service as any, '_startActualRecording')
        .mockReturnValueOnce(undefined)

      // Act
      await service.startRecording()

      // Assert
      expect(prepareRecordingSpy).toHaveBeenCalled()
      expect(startRecordingSpy).toHaveBeenCalled()
    })

    it('should not start recording if already recording.', async () => {
      // Arrange
      service = configureService()
      service['_isVoiceRecordingSig'].set(true)
      const prepareRecordingSpy = jest
        .spyOn(service as any, '_prepareRecording')
        .mockResolvedValue(undefined)

      // Act
      await service.startRecording()

      // Assert
      expect(prepareRecordingSpy).not.toHaveBeenCalled()
    })
  })

  describe('stopRecording()', () => {
    it('should stop recording if currently recording.', async () => {
      // Arrange
      service = configureService()
      service['_isVoiceRecordingSig'].set(true)
      const stopActualRecordingSpy = jest.spyOn(service as any, '_stopActualRecording')

      // Act
      service.stopRecording()

      // Assert
      expect(stopActualRecordingSpy).toHaveBeenCalled()
    })

    it('should do nothing if not currently recording.', async () => {
      // Arrange
      service = configureService()
      const stopActualRecordingSpy = jest.spyOn(service as any, '_stopActualRecording')

      // Act
      service.stopRecording()

      // Assert
      expect(stopActualRecordingSpy).not.toHaveBeenCalled()
    })
  })

  describe('_prepareRecording()', () => {
    it(`should log the error when browserMediaService.getUserMedia resolves to null.`, async () => {
      // Arrange
      const { mock: browserMediaServiceMock } = createBrowserMediaServiceMock({
        getUserMediaMockValue: null,
      })
      service = configureService(browserMediaServiceMock)
      const logSpy = jest.spyOn(TestBed.inject(LoggerService), 'log').mockImplementation(() => {
        //
      })

      // Act
      await service['_prepareRecording']()

      // Assert
      expect(logSpy).toHaveBeenCalledWith(
        'error',
        `Error while preparing audio stream: Couldn't get access to the microphone`
      )
    })

    it('should prepare recording with audio/webm;codecs=opus if supported.', async () => {
      // Arrange
      const { mock: browserMediaServiceMock } = createBrowserMediaServiceMock({
        getUserMediaMockValue: {},
        isTypeSupportedValue: true,
      })

      // Act
      service = configureService(browserMediaServiceMock)
      await service['_prepareRecording']()

      // Assert
      expect(browserMediaServiceMock.getUserMedia).toHaveBeenCalled()
      expect(mediaRecorderMockOptions?.mimeType).toBe('audio/webm;codecs=opus')
    })

    it('should prepare recording with "audio/mp4;codecs="mp4a.40.2"" if "audio/webm;codecs=opus" is not supported.', async () => {
      // Arrange
      const { mock: browserMediaServiceMock } = createBrowserMediaServiceMock({
        getUserMediaMockValue: {},
        isTypeSupportedValue: false,
      })

      // Act
      service = configureService(browserMediaServiceMock)
      await service['_prepareRecording']()

      // Assert
      expect(browserMediaServiceMock.getUserMedia).toHaveBeenCalled()
      expect(mediaRecorderMockOptions?.mimeType).toBe('audio/mp4;codecs="mp4a.40.2"')
    })

    describe(`MediaRecorder callbacks`, () => {
      it('should call `ondataavailable` method from MediaRecorder.', async () => {
        // Arrange
        const { mock: browserMediaServiceMock, controller } = createBrowserMediaServiceMock({
          getUserMediaMockValue: {},
          isTypeSupportedValue: false,
        })

        // Act
        service = configureService(browserMediaServiceMock)
        await service['_prepareRecording']()

        controller.pushEvent('ondataavailable')

        // Assert
        expect(browserMediaServiceMock.getUserMedia).toHaveBeenCalled()
        expect(service['_audioChunks'].length).toBe(1)
      })

      it('should call `onerror` method from MediaRecorder.', async () => {
        // Arrange
        const { mock: browserMediaServiceMock, controller } = createBrowserMediaServiceMock({
          getUserMediaMockValue: {},
          isTypeSupportedValue: false,
        })

        service = configureService(browserMediaServiceMock)

        const stopActualRecordingSpy = jest
          .spyOn(service as any, '_stopActualRecording')
          .mockImplementation(() => {
            //
          })

        // Act
        await service['_prepareRecording']()

        controller.pushEvent('onerror')

        // Assert
        expect(browserMediaServiceMock.getUserMedia).toHaveBeenCalled()
        expect(stopActualRecordingSpy).toHaveBeenCalledWith()
      })

      it('should call `onstop` method from MediaRecorder.', async () => {
        // Arrange
        const { mock: browserMediaServiceMock, controller } = createBrowserMediaServiceMock({
          getUserMediaMockValue: {},
          isTypeSupportedValue: false,
        })

        service = configureService(browserMediaServiceMock)
        const nextSpy = jest.spyOn(service['_newVoiceRecordingActionSubject'], 'next')

        // Act
        await service['_prepareRecording']()

        controller.pushEvent('onstop')

        // Assert
        expect(browserMediaServiceMock.getUserMedia).toHaveBeenCalled()
        expect(nextSpy).toHaveBeenCalled()
      })
    })
  })

  describe('_startActualRecording()', () => {
    it('should start recording and set isVoiceRecording to true.', async () => {
      // Arrange
      const mockRecorder = { start: jest.fn() }
      service = configureService()
      service['_mediaRecorder'] = mockRecorder as unknown as MediaRecorder

      // Act
      service['_startActualRecording']()

      // Assert
      expect(mockRecorder.start).toHaveBeenCalled()
      expect(service.isVoiceRecording()).toBe(true)
    })

    it('should log warning if _mediaRecorder is undefined.', async () => {
      // Arrange
      const logSpy = loggerMock.log
      service = configureService()
      service['_mediaRecorder'] = null

      // Act
      service['_startActualRecording']()

      // Assert
      expect(logSpy).toHaveBeenCalledWith(
        'warning',
        $localize`Tried to access _mediaRecorder while it's undefined`
      )
    })
  })

  describe('_stopActualRecording()', () => {
    it('should do nothing if _mediaRecorder is null.', async () => {
      // Arrange
      const nextSpy = jest
        .spyOn(service['_counterActionSubject'], 'next')
        .mockImplementation(() => {
          //
        })
      service = configureService()
      service['_mediaRecorder'] = null

      // Act
      service['_stopActualRecording']()

      // Assert
      expect(nextSpy).not.toHaveBeenCalled()
    })

    it('should stop recording and set isVoiceRecording to false.', async () => {
      // Arrange
      const mockRecorder = {
        stream: {
          getTracks: () => [{ stop: jest.fn() }],
        },
        stop: jest.fn(),
      }
      service = configureService()
      service['_mediaRecorder'] = mockRecorder as unknown as MediaRecorder

      // Act
      service['_stopActualRecording']()

      // Assert
      expect(mockRecorder.stop).toHaveBeenCalled()
      expect(service.isVoiceRecording()).toBe(false)
    })
  })

  describe('_resetAudioChunks()', () => {
    it('should reset audio chunks array.', async () => {
      // Arrange
      service = configureService()
      service['_audioChunks'] = [new Blob([]), new Blob([])]

      // Act
      service['_resetAudioChunks']()

      // Assert
      expect(service['_audioChunks']).toEqual([])
    })
  })
})
