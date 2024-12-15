import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { IconComponent } from '@lumin/shared/models/iconComponent.abstractClass'

@Component({
  selector: 'app-chevron-left',
  standalone: true,
  template: `<svg
    viewbox="0 0 32 32"
    [class]="size()"
    stroke="currentColor"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M10 16L20 6l1.4 1.4-8.6 8.6 8.6 8.6L20 26z" />
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChevronLeftIconComponent implements IconComponent {
  size = input('size-8')
}
