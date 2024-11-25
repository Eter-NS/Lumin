import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ThemeApplierDirective } from '@lumin/shared/theme-applier/theme-applier.directive'

@Component({
  standalone: true,
  imports: [RouterOutlet],
  hostDirectives: [ThemeApplierDirective],
  selector: 'app-root',
  template: `<router-outlet />`,
})
export class RootComponent {}
