import { Directive } from '@angular/core'

@Directive({
  selector: '[appInputSuffix]',
  standalone: true,
  host: {
    class: 'grow-0 text-text-light dark:text-text',
  },
})
export class InputSuffixDirective {}
