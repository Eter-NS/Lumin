import { inject, Injectable } from '@angular/core'
import { BreakpointObserver } from '@angular/cdk/layout'
import { map, shareReplay } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  #observer = inject(BreakpointObserver)

  readonly #IS_MOBILE_QUERY = '(max-width: 640px)'

  isMobile$ = this.#observer.observe(this.#IS_MOBILE_QUERY).pipe(
    map((state) => state.matches),
    shareReplay({ bufferSize: 1, refCount: true })
  )
}
