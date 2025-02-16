import { TestBed } from '@angular/core/testing'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { AudioTextSynthesisService } from './audio-text-synthesis.service'
import { APP_CONFIG, APP_CONFIG_VALUE } from '../app-config/app-config.token'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { ApiResponse } from '@lumin/shared/models/response.type'
import { firstValueFrom } from 'rxjs'
import { generateId } from '@lumin/shared/tools/generateId/generateId'
import { ID } from '@lumin/shared/models/id.type'

describe('AudioTextSynthesisService', () => {
  let service: AudioTextSynthesisService
  let httpTesting: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
        AudioTextSynthesisService,
      ],
    })

    service = TestBed.inject(AudioTextSynthesisService)
    httpTesting = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTesting.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('transformAudioToText()', () => {
    const userId = generateId<ID>(27)
    const audioBlob = new Blob(['test audio'], { type: 'audio/webm;codecs=opus' })

    it(`should send the POST request to the correct API endpoint and contain the audio recorded.`, async () => {
      // Arrange
      const expectedRequest = new FormData()
      expectedRequest.append('audio', audioBlob)

      // Act
      const pendingReq = firstValueFrom(service.transformAudioToText(userId, audioBlob))
      pendingReq

      const req = httpTesting.expectOne({
        method: 'POST',
        url: TestBed.inject(APP_CONFIG).apiUrl + '/speech-to-text',
      })

      // Assert
      expect(req.request.body).toEqual(expectedRequest)
    })

    it('should transform audio to text successfully.', async () => {
      // Arrange
      const expectedResponse: ApiResponse<string> = {
        state: 'resolved',
        data: 'transcribed text',
      }

      // Act
      const pendingReq = firstValueFrom(service.transformAudioToText(userId, audioBlob))

      const req = httpTesting.expectOne({
        method: 'POST',
        url: TestBed.inject(APP_CONFIG).apiUrl + '/speech-to-text',
      })

      req.flush(expectedResponse)

      // Assert
      expect(await pendingReq).toEqual(expectedResponse)
    })
  })

  describe('transformTextToAudio()', () => {
    const text = 'test text'
    const language = 'en-US'

    it('should transform text to audio successfully', async () => {
      // Arrange
      const expectedResponse: ApiResponse<Blob> = {
        state: 'resolved',
        data: new Blob(['test audio'], { type: 'audio/webm;codecs=opus' }),
      }

      // Act
      const pendingReq = firstValueFrom(service.transformTextToAudio(text, language))

      const req = httpTesting.expectOne({
        method: 'POST',
        url: `${TestBed.inject(APP_CONFIG).apiUrl}/text-to-speech`,
      })

      req.flush(expectedResponse)

      // Assert
      expect(await pendingReq).toBe(expectedResponse)
    })
  })
})
