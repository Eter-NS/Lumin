import { NgClass } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core'

@Component({
  selector: 'app-content-skeleton',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="flex-1 select-none space-y-6 py-1">
      <div data-test="skeleton-static-row" class="h-2 rounded" [ngClass]="[color()]"></div>
      @for (item of rowsArray(); track item) {
        <div class="space-y-3">
          <div data-test="skeleton-dynamic-row" class="grid grid-cols-3 gap-4">
            @for (row of dynamicRowItems; track row) {
              <div
                class="h-2 rounded"
                [ngClass]="[color(), $even ? 'col-span-2' : 'col-span-1']"
              ></div>
            }
          </div>
          <div data-test="skeleton-static-row" class="h-2 rounded" [ngClass]="[color()]"></div>
        </div>
      }
    </div>
  `,
  host: {
    '[class]': '"flex " + hostClasses()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentSkeletonComponent {
  /**
   * A set of tailwind classes to modify height of the placeholder
   */
  readonly blockHeight = input<string>('')
  /**
   * A set of tailwind classes to modify amount of rows presented
   */
  readonly rows = input(2, { transform: numberAttribute })
  /**
   * A set of tailwind classes to modify color of the skeleton stripes
   */
  readonly color = input<string>('bg-slate-700')
  /**
   * A set of tailwind classes to modify pulse animation
   */
  readonly animationConfig = input<string>('animate-pulse')

  protected readonly hostClasses = computed<string>(
    () => `${this.animationConfig()} ${this.blockHeight()}`
  )
  protected readonly rowsArray = computed<number[]>(() =>
    Array.from({ length: this.rows() }, (_, i) => i)
  )

  protected readonly dynamicRowItems = Array.from({ length: 4 }).map((_, i) => i)
}
