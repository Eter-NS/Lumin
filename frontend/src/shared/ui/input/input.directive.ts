import { Directive } from '@angular/core'

@Directive({
  selector: 'input[appInput], textarea[appInput]',
  standalone: true,
  host: {
    class:
      'flex-1 shrink-0 rounded-lg bg-ui-background-light p-1 text-text-light outline-none transition-colors dark:bg-ui-background dark:text-text placeholder:dark:text-text/80 placeholder:text-text-light/80',
  },
})
export class InputDirective {}
