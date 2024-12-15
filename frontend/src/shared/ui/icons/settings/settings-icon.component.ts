import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { IconComponent } from '@lumin/shared/models/iconComponent.abstractClass'

@Component({
  selector: 'app-settings-icon',
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
        d="M27 16.8v-1.6l1.9-1.7A2 2 0 0 0 29.3 11l-2.4-4a2 2 0 0 0-1.7-1 2 2 0 0 0-0.6 0.1l-2.5 0.8a11.3 11.3 0 0 0-1.3-0.7l-0.5-2.5a2 2 0 0 0-2-1.7h-4.7a2 2 0 0 0-2 1.7l-0.5 2.5a11.5 11.5 0 0 0-1.3 0.7l-2.4-0.8A2 2 0 0 0 6.8 6a2 2 0 0 0-1.7 1L2.7 11a2 2 0 0 0 0.4 2.5L5 15.2v1.6l-1.9 1.7A2 2 0 0 0 2.7 21l2.4 4a2 2 0 0 0 1.7 1 2 2 0 0 0 0.6-0.1l2.5-0.8a11.3 11.3 0 0 0 1.3 0.7l0.5 2.5a2 2 0 0 0 2 1.7h4.7a2 2 0 0 0 2-1.7l0.5-2.5a11.5 11.5 0 0 0 1.3-0.7l2.5 0.8a2 2 0 0 0 0.6 0.1 2 2 0 0 0 1.7-1l2.3-4a2 2 0 0 0-0.4-2.5ZM25.2 24l-3.4-1.2a8.9 8.9 0 0 1-2.7 1.6L18.4 28h-4.8l-0.7-3.5a9.4 9.4 0 0 1-2.7-1.6L6.8 24l-2.4-4 2.8-2.4a8.9 8.9 0 0 1 0-3.1L4.4 12l2.4-4 3.4 1.2a8.9 8.9 0 0 1 2.7-1.6L13.6 4h4.8l0.7 3.5a9.4 9.4 0 0 1 2.7 1.6L25.2 8l2.4 4-2.7 2.4a8.9 8.9 0 0 1 0 3.1L27.6 20Z"
      />
      <path
        d="M16 22a6 6 0 1 1 6-6 5.9 5.9 0 0 1-6 6Zm0-10a3.9 3.9 0 0 0-4 4 3.9 3.9 0 0 0 4 4 3.9 3.9 0 0 0 4-4 3.9 3.9 0 0 0-4-4Z"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsIconComponent implements IconComponent {
  size = input('size-8')
}
