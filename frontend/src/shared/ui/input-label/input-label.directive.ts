import { booleanAttribute, Directive, input } from '@angular/core'

@Directive({
  selector: '[appInputLabel]',
  standalone: true,
  host: {
    '[class.sr-only]': 'hidden()',
  },
})
export class InputLabelDirective {
  hidden = input(false, { transform: booleanAttribute })
}
