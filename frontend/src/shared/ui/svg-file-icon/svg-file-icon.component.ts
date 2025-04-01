import { NgClass } from '@angular/common'
import { ChangeDetectionStrategy, Component, input, computed, inject } from '@angular/core'
import { LazyInject } from '@lumin/shared/lazy-inject/lazy-inject.service'

@Component({
  selector: 'app-svg-file-icon',
  standalone: true,
  imports: [NgClass],
  template: `
    @let readComputedSize = computedSize();
    <svg
      [attr.width]="readComputedSize"
      [attr.height]="readComputedSize"
      [attr.viewBox]="viewBox()"
      class="fill-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="file"
        class="fill-gray-300 dark:fill-gray-300 dark:opacity-100"
        [attr.d]="filePath()"
      />
      <path
        id="file-folding"
        class="fill-gray-600 dark:fill-gray-400"
        [attr.d]="fileFoldingPath()"
      />
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        class="fill-gray-900"
        [ngClass]="[fontSize()]"
      >
        {{ text() }}
      </text>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgFileIconComponent {
  #inject = inject(LazyInject)
  size = input<'small' | 'large'>('small')
  text = input('docx')

  #ORIGINAL_SIZE = 64

  protected computedSize = computed(() => {
    switch (this.size()) {
      case 'small':
        return 64
      case 'large':
        return 144
      default: {
        const logger = this.#inject.get(() =>
          import('../../data-access/logger/logger.service').then((s) => s.LoggerService)
        )
        logger.then((service) =>
          service.log(
            'error',
            `Provided size in SvgFileIconComponent is not valid, expected "small" or "large", received "${this.size()}". Moving the size to "small".`
          )
        )
        return 64
      }
    }
  })
  protected viewBox = computed(() => `0 0 ${this.computedSize()} ${this.computedSize()}`)

  protected filePath = computed(() => {
    const scale = this.computedSize() / this.#ORIGINAL_SIZE
    return `M${7 * scale} ${54.4 * scale}V${9.6 * scale}C${7 * scale} ${4.2976 * scale} ${11.2808 * scale} 0 ${16.5625 * scale} 0H${38.875 * scale}L${58 * scale} ${19.2 * scale}V${54.4 * scale}C${58 * scale} ${59.7024 * scale} ${53.7192 * scale} ${64 * scale} ${48.4375 * scale} ${64 * scale}H${16.5625 * scale}C${11.2808 * scale} ${64 * scale} ${7 * scale} ${59.7024 * scale} ${7 * scale} ${54.4 * scale}Z`
  })

  protected fileFoldingPath = computed(() => {
    const scale = this.computedSize() / this.#ORIGINAL_SIZE
    return `M${39 * scale} ${12.6667 * scale}V0L${58 * scale} ${19 * scale}H${45.3333 * scale}C${41.8342 * scale} ${19 * scale} ${39 * scale} ${16.1658 * scale} ${39 * scale} ${12.6667 * scale}Z`
  })

  protected fontSize = computed(() => {
    switch (this.size()) {
      case 'small':
        return 'text-base'
      case 'large':
        return 'text-4xl'

      default:
        return 'text-base'
    }
  })
}
