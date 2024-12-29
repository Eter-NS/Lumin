import { booleanAttribute, computed, Directive, input } from '@angular/core'

@Directive({
  selector: '[appInputLabel]',
  standalone: true,
  host: {
    '[class]': "'text-text-light dark:text-text ' + dynamicClasses()",
  },
})
export class InputLabelDirective {
  readonly hidden = input(false, { transform: booleanAttribute })

  readonly dynamicClasses = computed(
    () => `${this.hidden() ? 'sr-only' : 'flex-auto shrink-0 basis-full'}`
  )
}
