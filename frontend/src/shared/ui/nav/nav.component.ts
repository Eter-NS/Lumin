import { NgComponentOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { RoutingLink } from '../../utils/models/routingLink.interface'

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterLinkActive, NgComponentOutlet],
  template: `
    <nav
      class="view-transition | z-[2] bg-ui-background-light p-1.5 text-text-light sm:rounded-bl-lg dark:bg-ui-background dark:text-text"
    >
      <ul data-test="navigation-list" class="flex items-center justify-evenly gap-4 *:text-sm">
        @for (link of routingLinks(); track link.linkText) {
          <li
            data-test="navigation-list-item"
            class="relative grid aspect-square w-1/5 max-w-20 place-content-center sm:w-full"
          >
            <a
              class="grid cursor-pointer grid-rows-[1fr_auto] justify-items-center p-2 *:z-[1] before:absolute before:inset-0 before:rounded-lg before:opacity-10 hover:before:bg-current focus-visible:before:bg-current motion-safe:before:transition-colors"
              [routerLink]="link.routerLink"
              routerLinkActive="before:bg-current before:opacity-20 hover:before:opacity-10"
              ariaCurrentWhenActive="page"
            >
              <div class="row-span-1">
                <ng-container *ngComponentOutlet="link.component"></ng-container>
              </div>
              <span class="row-span-2 text-sm">{{ link.linkText }}</span>
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    .view-transition {
      view-transition-name: nav;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  readonly routingLinks = input.required<RoutingLink[]>()
}
