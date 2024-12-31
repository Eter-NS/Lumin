import { Directive, inject, Renderer2 } from '@angular/core'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'

@Directive({
  selector: '[appTextareaAutoResize]',
  standalone: true,
  host: {
    '(keyup)': 'onKeyup($event)',
  },
  hostDirectives: [
    {
      directive: CdkTextareaAutosize,
      inputs: ['cdkAutosizeMinRows: minRows', 'cdkAutosizeMaxRows: maxRows'],
    },
  ],
})
export class TextareaAutoResizeDirective {
  #renderer = inject(Renderer2)

  protected onKeyup(e: Event) {
    const target = e.target as HTMLTextAreaElement
    const newHeight = this._calculateNewHeight(target)
    const maxHeightInPixels = this._getMaxHeightInPixels(target)

    if (newHeight >= maxHeightInPixels) {
      this._showScrollbar(target)
    } else {
      this._hideScrollbar(target)
    }
  }

  private _calculateNewHeight(element: HTMLElement): number {
    return element.scrollHeight
  }

  private _getMaxHeightInPixels(el: HTMLElement): number {
    const maxHeight = getComputedStyle(el).maxHeight
    return parseInt(maxHeight.replace('px', ''), 10)
  }

  private _showScrollbar(el: HTMLElement) {
    this.#renderer.removeClass(el, `hide-scrollbar`)
    this.#renderer.addClass(el, `show-scrollbar`)
  }

  private _hideScrollbar(el: HTMLElement) {
    this.#renderer.removeClass(el, `show-scrollbar`)
    this.#renderer.addClass(el, `hide-scrollbar`)
  }
}
