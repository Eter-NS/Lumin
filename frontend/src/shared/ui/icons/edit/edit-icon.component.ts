import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { IconComponent } from '@lumin/shared/models/iconComponent.interface'

@Component({
  selector: 'app-edit-icon',
  standalone: true,
  template: `
    <svg
      role="img"
      viewbox="0 0 32 32"
      [class]="size()"
      stroke="currentColor"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M2 26h28v2H2zM25.4 9c0.8-0.8 0.8-2 0-2.8l-3.6-3.6c-0.8-0.8-2-0.8-2.8 0l-15 15V24h6.4l15-15z m-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10 3.6 3.6-10 10H6z"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditIconComponent implements IconComponent {
  size = input('size-8')
}
