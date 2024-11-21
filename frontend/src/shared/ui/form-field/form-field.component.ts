import { NgClass } from '@angular/common'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [NgClass],
  template: `
    <fieldset class="group/focus relative">
      <div class="absolute inset-0">
        <div
          class="h-full w-full scale-95 rounded-2xl opacity-0 transition-opacity transition-transform duration-300 group-focus-within/focus:scale-100 group-focus-within/focus:opacity-100"
          [ngClass]="[borderBackground()]"
        ></div>
      </div>
      <div class="relative p-2">
        <div
          class="fieldset-grid | min-h-12 min-w-64 content-center items-center justify-center rounded-xl border-2 border-solid border-slate-800 p-2 transition-colors duration-300 group-focus-within/focus:border-transparent has-[>_*:nth-child(n_+_2)]:justify-between"
          [ngClass]="[innerBackground(), textColor()]"
        >
          <ng-content select="[appInputPrefix]"></ng-content>
          <ng-content select="[appInput]">No input detected!</ng-content>
          <ng-content select="[appInputSuffix]"></ng-content>
        </div>
      </div>
    </fieldset>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  borderBackground = input(
    'bg-gradient-to-br from-custom-1 via-custom-2 to-custom-3 dark:grayscale-[33%]'
  )
  innerBackground = input('bg-ui-background-light dark:bg-ui-background')
  textColor = input('text-slate-900')
}
