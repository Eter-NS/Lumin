import { NgClass, NgComponentOutlet, NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  model,
  TemplateRef,
} from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { RoutingLink } from '../../utils/models/routingLink.interface'
import { ChevronLeftIconComponent } from '../icons/chevron-left/chevron-left-icon.component'

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    RouterLinkActive,
    NgComponentOutlet,
    ChevronLeftIconComponent,
    NgTemplateOutlet,
  ],
  templateUrl: 'nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  readonly routingLinks = input.required<RoutingLink[]>()
  readonly expanded = model.required<boolean>()
  readonly content = contentChild('navSectionContent', { read: TemplateRef })

  protected readonly iconComponentSizeConfig = { size: 'size-7 sm:size-8' }

  protected readonlyExpanded = this.expanded.asReadonly()

  protected toggleExpanded(force?: boolean | undefined) {
    const newState = typeof force === 'boolean' ? force : !this.expanded()

    this.expanded.set(newState)
  }
}
