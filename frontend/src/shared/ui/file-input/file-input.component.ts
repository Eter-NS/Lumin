/* eslint-disable @typescript-eslint/no-explicit-any */
import { booleanAttribute, ChangeDetectionStrategy, Component, input, signal } from '@angular/core'
import { ImageIconComponent } from '../icons/image/image-icon.component'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-file-input',
  standalone: true,
  imports: [ImageIconComponent],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: FileInputComponent, multi: true }],
  template: `
    <button
      type="button"
      data-test="file-input-button"
      [title]="multiple() ? 'Select multiple images' : 'Select an image'"
      (click)="fileInputRef.click()"
      (focus)="onTouch()"
      [disabled]="disabled()"
    >
      <app-image-icon size="size-8" />
    </button>
    <input
      #fileInputRef
      type="file"
      class="sr-only"
      aria-hidden="true"
      data-test="file-input-ref"
      [multiple]="multiple()"
      [accept]="accept()"
      [disabled]="disabled()"
      (input)="onInput($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputComponent implements ControlValueAccessor {
  accept = input.required<string>()
  multiple = input(false, { transform: booleanAttribute })

  private _value: File[] | null = null
  protected disabled = signal(false)

  onChange!: (value: File[] | null) => void
  onTouch!: () => void

  writeValue(value: File[] | null): void {
    this._value = value
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }

  onInput(event: Event) {
    if (this.disabled()) {
      return
    }

    const target = event.target as HTMLInputElement
    const files = target.files
    if (!files) {
      this.resetValue()
      return
    }

    const arr: File[] = []
    for (let i = 0; i < files.length; i++) {
      const element = files.item(i)

      if (element) {
        arr.push(element)
      }
    }

    if (!arr.length) {
      this.resetValue()
      return
    }

    this._value = arr
    this.onChange(this._value)
    target.value = ''
  }

  private resetValue() {
    this._value = null
  }
}
