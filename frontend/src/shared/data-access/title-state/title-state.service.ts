import { Injectable, Signal, signal } from '@angular/core'
import { Title } from '@angular/platform-browser'

/**
 * @description A custom extension of Title, with additional reactive context (signal)
 * */
@Injectable({ providedIn: 'root' })
export class TitleStateService extends Title {
  private _currentTitle = signal('')
  private readonlyCurrentTitle = this._currentTitle.asReadonly()

  override getTitle(): string {
    return this.readonlyCurrentTitle()
  }

  /**
   * @returns a readonly signal with current page title
   */
  getTitleAsSignal(): Signal<string> {
    return this.readonlyCurrentTitle
  }

  override setTitle(newTitle: string): void {
    this._currentTitle.set(newTitle)
  }
}
