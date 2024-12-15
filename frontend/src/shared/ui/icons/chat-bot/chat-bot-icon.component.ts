import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { IconComponent } from '@lumin/shared/models/iconComponent.abstractClass'

@Component({
  selector: 'app-chat-bot-icon',
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
        d="M16 19a7 7 0 0 1-5.8-3.1l1.6-1.1a5 5 0 0 0 8.4 0l1.6 1.1A7 7 0 0 1 16 19z m4-11a2 2 0 1 0 2 2 2 2 0 0 0-2-2z m-8 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"
      />
      <path
        d="M17.7 30L16 29l4-7h6a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9v2H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-4.8Z"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatBotIconComponent implements IconComponent {
  size = input('size-8')
}
