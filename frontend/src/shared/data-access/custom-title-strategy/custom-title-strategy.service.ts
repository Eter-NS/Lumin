import { inject, Injectable } from '@angular/core'
import { RouterStateSnapshot, TitleStrategy } from '@angular/router'
import { TitleStateService } from '../title-state/title-state.service'
import { Title } from '@angular/platform-browser'

@Injectable({ providedIn: 'root' })
export class CustomTitleStrategy extends TitleStrategy {
  #title = inject(Title)
  #titleState = inject(TitleStateService)

  constructor() {
    super()
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const DEFAULT_TITLE = 'Lumin'
    const title = this.buildTitle(snapshot) ?? ''

    this.#titleState.setTitle(title)
    this.#title.setTitle(title.length ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE)
  }
}
