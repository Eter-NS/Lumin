import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { IconComponent } from '@lumin/shared/models/iconComponent.interface'

@Component({
  selector: 'app-send-filled-icon',
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
        d="M27.4 15.1l-21.9-11a1 1 0 0 0-1.1 0.1 1 1 0 0 0-0.4 1L6.7 15H18v2H6.7L4 26.7A1 1 0 0 0 5 28a1 1 0 0 0 0.5-0.1l21.9-11a1 1 0 0 0 0.1-1.8Z"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendFilledIconComponent implements IconComponent {
  size = input('size-8')
}
