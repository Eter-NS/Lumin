import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core'
import { SvgFileIconComponent } from '../svg-file-icon/svg-file-icon.component'
import { TrashCanIconComponent } from '../icons/trash-can/trash-can-icon.component'

@Component({
  selector: 'app-files-preview-list-item',
  standalone: true,
  imports: [SvgFileIconComponent, TrashCanIconComponent],
  template: `<figure
      class="grid h-full grid-rows-[1fr_auto] place-items-center content-stretch rounded-lg bg-transparent p-2 outline-none transition-colors hover:bg-gray-950/25 focus-visible:bg-gray-950/25 dark:hover:bg-gray-950/25 dark:focus-visible:bg-gray-950/25"
      tabindex="0"
    >
      @if (fileType() === 'image') {
        <img
          data-test="image-preview"
          [src]="imageUrl()"
          alt=""
          aria-hidden="true"
          class="max-w-32 bg-contain sm:max-w-40"
          [title]="filename()"
        />
      } @else {
        <app-svg-file-icon
          data-test="custom-svg-file-icon"
          [text]="fileExtension() ?? 'unknown'"
          size="small"
        />
      }
      <figcaption data-test="visible-filename">{{ showName() }}</figcaption>
    </figure>
    <button
      data-test="remove-item-button"
      class="absolute right-0 top-0 rounded-md bg-ui-background-light p-1.5 opacity-0 outline-none transition-opacity group-hover/focus:opacity-100 group-focus-visible/focus:opacity-100 dark:bg-ui-background"
      (click)="emitRemoveElement()"
    >
      <app-trash-can-icon />
      <p data-test="remove-item-button-sr-text" class="sr-only">
        Remove {{ filename() }} from the list
      </p>
    </button>`,
  host: { class: 'group/focus' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesPreviewListItemComponent {
  fileType = input.required<'image' | 'other'>()
  filename = input.required<string>()
  displayname = input.required<string>()
  isDisplayNameTruncated = input.required<boolean>()

  fileExtension = input<string | null>()
  imageUrl = input<string | null>(null)

  remove = output<void>()

  protected showName = computed(() =>
    this.isDisplayNameTruncated() ? `${this.displayname()}...` : this.filename()
  )

  protected emitRemoveElement() {
    this.remove.emit()
  }
}
