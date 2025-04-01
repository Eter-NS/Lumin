import { Directive, ElementRef, inject, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appHorizontalScroll]',
  standalone: true,
  host: {
    '(wheel)': 'onScroll($event)',
  },
})
export class HorizontalScrollDirective {
  #hostEl = inject<ElementRef<HTMLElement>>(ElementRef)
  #renderer = inject(Renderer2)

  protected onScroll(e: WheelEvent) {
    e.preventDefault()

    const nativeElement = this.#hostEl.nativeElement

    this.#renderer.setProperty(nativeElement, 'scrollLeft', nativeElement.scrollLeft + e.deltaY)
  }
}
