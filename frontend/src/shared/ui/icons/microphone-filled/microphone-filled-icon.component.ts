import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { IconComponent } from '@lumin/shared/models/iconComponent.interface'

@Component({
  selector: 'app-microphone-filled-icon',
  standalone: true,
  template: `
    <svg
      role="img"
      viewBox="0 0 24 24"
      [class]="size()"
      stroke="currentColor"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M17.25 10.5v2.25a5.25 5.25 0 0 1-10.5 0v-2.25H5.25v2.25a6.75 6.75 0 0 0 6 6.75V20h-3v1.5h7.5v-1.5h-3v-1.05A6.75 6.75 0 0 0 18.75 12.75v-2.25Z"
      />
      <path
        d="M12 16.5a3.75 3.75 0 0 0 3.75-3.75V5.25a3.75 3.75 0 0 0-7.5 0v8.25a3.75 3.75 0 0 0 3.75 3.75Z"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MicrophoneFilledIconComponent implements IconComponent {
  size = input('size-8')
}
