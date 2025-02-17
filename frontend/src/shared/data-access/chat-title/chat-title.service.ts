import { HttpClient, HttpParams } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { APP_CONFIG } from '../app-config/app-config.token'
import { ID } from '@lumin/shared/models/id.type'
import { ApiResponse } from '@lumin/shared/models/response.type'

@Injectable({
  providedIn: 'root',
})
export class ChatTitleService {
  #config = inject(APP_CONFIG)
  #http = inject(HttpClient)

  getTitle(userId: ID, chatId: ID): Observable<ApiResponse<string>> {
    const params = new HttpParams().set('userId', userId).set('chatId', chatId)

    return this.#http.get<ApiResponse<string>>(this.#config.apiUrl + `/chat-title`, { params })
  }

  updateTitle(userId: ID, chatId: ID, newTitle: string): Observable<ApiResponse<boolean>> {
    return this.#http.patch<ApiResponse<boolean>>(this.#config.apiUrl + `/chat-title`, {
      userId,
      chatId,
      newTitle,
    })
  }
}
