import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { IconComponent } from '@lumin/shared/models/iconComponent.interface'

@Component({
  selector: 'app-image-icon',
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
      <path d="M19 14a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm0-4a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
      <path
        d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 22H6v-6l5-5 5.6 5.6a2 2 0 0 0 2.8 0L21 19l5 5Zm0-4.8l-3.6-3.6a2 2 0 0 0-2.8 0L18 19.2l-5.6-5.6a2 2 0 0 0-2.8 0L6 17.2V6h20Z"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageIconComponent implements IconComponent {
  size = input('size-8')
}
