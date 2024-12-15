import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { IconComponent } from '@lumin/shared/models/iconComponent.abstractClass'

@Component({
  selector: 'app-book-icon',
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
      <path d="M19 10h7v2h-7z m0 5h7v2h-7z m0 5h7v2h-7zM6 10h7v2H6z m0 5h7v2H6z m0 5h7v2H6z" />
      <path
        d="M28 5H4a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM4 7h11v18H4Zm13 18V7h11v18Z"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookIconComponent implements IconComponent {
  size = input('size-8')
}
