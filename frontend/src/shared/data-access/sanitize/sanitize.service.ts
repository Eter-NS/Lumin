import { inject, Injectable, SecurityContext } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Injectable({
  providedIn: 'root',
})
export class SanitizeService {
  #sanitizer = inject(DomSanitizer)

  sanitizeText(text: string) {
    return this.#sanitizer.sanitize(SecurityContext.HTML, text)
  }
}
