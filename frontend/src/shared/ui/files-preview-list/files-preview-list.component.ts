import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  output,
  TemplateRef,
} from '@angular/core'
import { ImageCacheService } from '@lumin/shared/image-cache/image-cache.service'
import { UTILS_PROVIDERS } from '@lumin/shared/tools/tools.token'
import { HorizontalScrollDirective } from '../horizontal-scroll/horizontal-scroll.directive'
import { FilesPreviewListItemComponent } from '../files-preview-list-item/files-preview-list-item.component'
import {
  SubstringCacheKey,
  SubstringCacheValue,
  SubstringService,
} from '@lumin/shared/substring/substring.service'

@Component({
  selector: 'app-files-preview-list',
  standalone: true,
  imports: [NgTemplateOutlet, HorizontalScrollDirective, FilesPreviewListItemComponent],
  template: `<ul
    data-test="files-preview-list"
    appHorizontalScroll
    class="flex min-h-40 max-w-40 snap-x items-stretch gap-2 overflow-x-scroll pb-1 sm:max-w-lg"
  >
    @let readFiles = files();
    @let readFallbackContent = fallbackContent() || emptyContentFallback;
    @if (readFiles) {
      @for (file of readFiles; track file.name) {
        @let fileName = getFileName(file);
        <li class="relative snap-start">
          <app-files-preview-list-item
            [fileType]="isImageFile(file) ? 'image' : 'other'"
            [filename]="file.name"
            [displayname]="fileName.name"
            [isDisplayNameTruncated]="fileName.truncated"
            [fileExtension]="getFileExtension(file)"
            [imageUrl]="getImage(file)"
            (remove)="onRemove(file.name)"
            class="h-full"
          />
        </li>
      } @empty {
        <ng-container *ngTemplateOutlet="readFallbackContent"></ng-container>
      }
    } @else {
      <ng-container *ngTemplateOutlet="readFallbackContent"></ng-container>
    }
    <ng-template #emptyContentFallback></ng-template>
  </ul>`,
  host: {
    '[class]': 'hostClasses()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesPreviewListComponent {
  #imageCacheService = inject(ImageCacheService)
  #textSubstringService = inject(SubstringService)
  #utilities = inject(UTILS_PROVIDERS)

  files = input.required<File[] | null>()
  remove = output<string>()

  protected fallbackContent = contentChild('fallbackBlock', { read: TemplateRef })

  protected hostClasses = computed(() => `${Array.isArray(this.files()) ? 'block' : ''} `)

  protected isImageFile(file: File): boolean {
    const fileExtension = this.getFileExtension(file)
    return this.#imageCacheService.IMAGE_EXTENSIONS.some((ext) => ext === fileExtension)
  }

  protected getImage(file: File): string | null {
    const key = this.#imageCacheService.generateUniqueKey(file)

    if (!key) {
      return null
    }

    const cacheEntry = this.#imageCacheService.get(key)
    if (cacheEntry && cacheEntry.lastModified === file.lastModified) {
      return cacheEntry.url
    }

    const imageUrl = this.#utilities.createObjectUrl(file)

    if (!imageUrl) {
      return null
    }

    this.#imageCacheService.push(key, { url: imageUrl, lastModified: file.lastModified })
    return imageUrl
  }

  protected getFileName({ name }: File): SubstringCacheValue {
    const STRING_LENGTH = 12
    const key: SubstringCacheKey = `${name}-${STRING_LENGTH}`
    const cacheEntry = this.#textSubstringService.get(key)

    if (cacheEntry) {
      return cacheEntry
    }

    const { accessKey: newKey, data } = this.#textSubstringService.computeSubstring(
      name,
      STRING_LENGTH
    )

    this.#textSubstringService.push(newKey, data)

    return data
  }

  protected getFileExtension(file: File) {
    return this.#utilities.getFileExtension(file)
  }

  protected onRemove(filename: string) {
    this.remove.emit(filename)
  }
}
