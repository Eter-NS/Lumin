import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { IconComponent } from '@lumin/shared/models/iconComponent.interface'

@Component({
  selector: 'app-overflow-menu-vertical-icon',
  standalone: true,
  template: `
    <svg
      role="img"
      viewBox="0 0 32 32"
      [class]="size()"
      stroke="currentColor"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 8m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
      <path d="M16 16m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
      <path d="M16 24m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverflowMenuVerticalIconComponent implements IconComponent {
  size = input('size-8')
}
