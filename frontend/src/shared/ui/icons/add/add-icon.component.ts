import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { IconComponent } from '@lumin/shared/models/iconComponent.interface'

@Component({
  selector: 'app-add-icon',
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
      <path d="M17 15V8h-2v7H8v2h7v7h2v-7h7v-2z" />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddIconComponent implements IconComponent {
  size = input('size-8')
}
