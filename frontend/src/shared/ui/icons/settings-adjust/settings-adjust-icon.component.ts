import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-settings-adjust-icon',
  standalone: true,
  template: `<svg
    role="img"
    viewbox="0 0 32 32"
    width="32"
    height="32"
    stroke="currentColor"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M30 8h-4.1c-0.5-2.3-2.5-4-4.9-4s-4.4 1.7-4.9 4H2v2h14.1c0.5 2.3 2.5 4 4.9 4s4.4-1.7 4.9-4H30V8z m-9 4c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zM2 24h4.1c0.5 2.3 2.5 4 4.9 4s4.4-1.7 4.9-4H30v-2H15.9c-0.5-2.3-2.5-4-4.9-4s-4.4 1.7-4.9 4H2v2z m9-4c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3z"
    />
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsAdjustIconComponent {}
