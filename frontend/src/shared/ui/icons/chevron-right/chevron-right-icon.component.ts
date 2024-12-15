import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { IconComponent } from '@lumin/shared/models/iconComponent.abstractClass'

@Component({
  selector: 'app-chevron-right',
  standalone: true,
  template: `<svg
    viewbox="0 0 32 32"
    [class]="size()"
    stroke="currentColor"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M22 16L12 26l-1.4-1.4 8.6-8.6-8.6-8.6L12 6z" />
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChevronRightIconComponent implements IconComponent {
  size = input('size-8')
}
