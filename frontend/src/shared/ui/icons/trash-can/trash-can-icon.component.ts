import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { IconComponent } from '@lumin/shared/models/iconComponent.interface'

@Component({
  selector: 'app-trash-can-icon',
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
      <path d="M12 12h2v12h-2z m6 0h2v12h-2z" />
      <path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6z m4 22V8h16v20z m4-26h8v2h-8z" />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrashCanIconComponent implements IconComponent {
  size = input('size-8')
}
