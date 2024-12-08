import { DOCUMENT, isPlatformBrowser } from '@angular/common'
import { AfterViewInit, DestroyRef, Directive, inject, PLATFORM_ID, Renderer2 } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ThemeService } from '@lumin/shared/theme/theme.service'
import { BrowserTheme } from '../../utils/models/browserTheme.type'

@Directive({
  selector: '[appThemeApplier]',
  standalone: true,
})
export class ThemeApplierDirective implements AfterViewInit {
  #themeService = inject(ThemeService)
  #document = inject(DOCUMENT)
  #renderer = inject(Renderer2)
  #platform = inject(PLATFORM_ID)
  #destroyRef = inject(DestroyRef)

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.#platform)) {
      this._setAppThemeListener()
    }
  }

  private _setAppThemeListener() {
    this.#themeService.theme$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(this._toggleAppTheme.bind(this))
  }

  private _toggleAppTheme(theme: BrowserTheme) {
    const documentElement = this.#document.documentElement

    this.#renderer.removeClass(documentElement, 'light')
    this.#renderer.removeClass(documentElement, 'dark')

    this.#renderer.addClass(documentElement, theme)
  }
}
