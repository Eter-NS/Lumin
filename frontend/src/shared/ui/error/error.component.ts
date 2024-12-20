import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, contentChild, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <ng-container *ngTemplateOutlet="errorMessage()"></ng-container>
    @if (action(); as action) {
      <div class="grid place-content-center">
        <ng-container *ngTemplateOutlet="action"></ng-container>
      </div>
    }
  `,
  host: {
    class: 'block bg-error-light dark:bg-error text-base p-4 rounded-md md:rounded-lg',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  errorMessage = contentChild.required('errorMessage', { read: TemplateRef })
  action = contentChild('action', { read: TemplateRef })
}
