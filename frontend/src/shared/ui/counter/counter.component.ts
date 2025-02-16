import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import { UTILS_PROVIDERS } from '@lumin/shared/tools/tools.token'

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `{{ formatTime(time()) }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  protected formatTime = inject(UTILS_PROVIDERS).formatTime

  /**
   * An input property that specifies the current time of the counter.
   * Requires time in seconds.
   */
  time = input.required<number | null>()
}
