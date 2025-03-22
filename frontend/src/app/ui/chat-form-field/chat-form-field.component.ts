import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  inject,
  input,
  TemplateRef,
} from '@angular/core'
import { TailwindMergeToken } from '@lumin/shared/injection-tokens/tailwind-merge/tailwind-merge.token'

@Component({
  selector: 'app-chat-form-field',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <div data-test="decorative-border-positioner" class="absolute inset-0">
      <div
        data-test="decorative-border-element"
        [class]="
          twMerge(
            'h-full w-full scale-95 rounded-2xl opacity-0 duration-300 group-focus-within/focus:scale-100 group-focus-within/focus:opacity-100 motion-safe:transition-all',
            borderBackground()
          )
        "
      ></div>
    </div>
    <div data-test="form-field-content-parent" class="relative p-2">
      <div
        data-test="form-field-content-wrapper"
        [class]="
          twMerge(
            'flex min-h-12 min-w-64 flex-wrap content-center items-center justify-center gap-2 rounded-xl border-2 border-solid border-slate-800 p-2 transition-colors duration-300 group-focus-within/focus:border-transparent has-[>_*:nth-child(n_+_2)]:justify-between',
            innerBackground(),
            textColor(),
            overrideStyles()
          )
        "
      >
        <ng-template #contentFallback>
          <span data-test="content-fallback">No content detected!</span>
        </ng-template>
        <ng-container *ngTemplateOutlet="content() || contentFallback"></ng-container>
      </div>
    </div>
  `,
  host: {
    class: 'group/focus relative block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatFormFieldComponent {
  protected twMerge = inject(TailwindMergeToken).twMerge

  borderBackground = input(
    'bg-gradient-to-br from-custom-1 via-custom-2 to-custom-3 dark:grayscale-[33%]'
  )
  innerBackground = input('bg-ui-background-light dark:bg-ui-background')
  textColor = input('dark:text-text text-text-light')
  overrideStyles = input('')

  protected content = contentChild('content', { read: TemplateRef })
}
