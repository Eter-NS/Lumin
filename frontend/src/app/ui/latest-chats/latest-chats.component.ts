import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ChatPreview } from '@lumin/app/models/chatPreview.interface'

@Component({
  selector: 'app-latest-chats',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2 class="mb-1 text-end text-xl">Latest Chats</h2>
    <ul>
      @for (chat of latestChats(); track chat.id) {
        <li
          class="relative ms-4 before:absolute before:inset-0 before:z-0 before:rounded-md before:bg-current before:opacity-10"
        >
          <a
            routerLink="/app/chat/{{ chat.id }}"
            class="app-outline | relative block overflow-hidden rounded-md p-2 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:translate-x-full before:bg-current before:transition-[opacity,_transform] before:duration-200 before:ease-in-out hover:before:translate-x-0"
            data-test="latest-chat-item"
            >{{ chat.title }}</a
          >
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LatestChatsComponent {
  latestChats = input.required<ChatPreview[]>()
}
