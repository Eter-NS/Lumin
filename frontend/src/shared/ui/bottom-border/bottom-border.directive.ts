import { Directive } from '@angular/core'

@Directive({
  selector: '[appBottomBorder]',
  standalone: true,
  host: {
    class:
      'border-b-2 border-transparent transition-colors focus:border-custom-3 dark:focus:border-custom-1',
  },
})
export class BottomBorderDirective {}
