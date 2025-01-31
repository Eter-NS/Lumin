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
    const title = this.buildTitle(snapshot) ?? ''

    this._propagateTitle(title)
  }

  /**
   * Sets the new title for the application.
   *
   * @param {string} newTitle - The new title to be set.
   */
  setTitle(newTitle: string) {
    this._propagateTitle(newTitle)
  }

  private _propagateTitle(newTitle: string) {
    const DEFAULT_TITLE = 'Lumin'
    this.#titleState.setTitle(newTitle)
    this.#title.setTitle(newTitle.length ? `${newTitle} | ${DEFAULT_TITLE}` : DEFAULT_TITLE)
  }
}
