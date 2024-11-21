import { Directive, input } from '@angular/core'

@Directive({
  selector: 'input[appInput]',
  standalone: true,
  host: {
    class:
      "'fieldset-grid--input | border-select-colour focus-visible:outline-select-colour border-b-2 outline-none focus-visible:outline-1' + ' ' +  customElements()",
  },
})
export class InputDirective {
  customClasses = input('')
}
