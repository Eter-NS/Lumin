import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { ApiResponse } from '@lumin/shared/models/response.type'
import { Observable } from 'rxjs'
import { APP_CONFIG } from '../app-config/app-config.token'
import { ID } from '@lumin/shared/models/id.type'

@Injectable()
export class AudioTextSynthesisService {
  #http = inject(HttpClient)
  #config = inject(APP_CONFIG)

  transformAudioToText(userId: ID, audio: Blob): Observable<ApiResponse<string>> {
    const body = new FormData()
    body.append('audio', audio)

    return this.#http.post<ApiResponse<string>>(this.#config.apiUrl + '/speech-to-text', body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  transformTextToAudio(text: string, language: string): Observable<ApiResponse<Blob>> {
    return this.#http.post<ApiResponse<Blob>>(this.#config.apiUrl + '/text-to-speech', {
      text,
      language,
    })
  }
}
