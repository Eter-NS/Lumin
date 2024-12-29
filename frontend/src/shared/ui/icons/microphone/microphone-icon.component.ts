import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { IconComponent } from '@lumin/shared/models/iconComponent.interface'

@Component({
  selector: 'app-microphone-icon',
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
        d="M17.25 10.5v2.25a5.25 5.25 0 0 1-10.5 0v-2.25H5.25v2.25a6.75 6.75 0 0 0 6 6.75V21h-3v2h7.5v-2h-3v-2.1A6.75 6.75 0 0 0 18.75 12.75v-2.25Z"
      />
      <path
        d="M12 16.5a3.75 3.75 0 0 0 3.75-3.75V5.25a3.75 3.75 0 0 0-7.5 0v10.5a3.75 3.75 0 0 0 3.75 3.75ZM9.75 5.25a2.25 2.25 0 0 1 4.5 0v7.5a2.25 2.25 0 0 1-4.5 0Z"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MicrophoneIconComponent implements IconComponent {
  size = input('size-8')
}
