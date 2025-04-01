/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FilesPreviewListComponent } from './files-preview-list.component'
import { Component, input, Provider, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { ImageCacheService, ImageCacheValue } from '@lumin/shared/image-cache/image-cache.service'
import { UTILS_PROVIDERS } from '@lumin/shared/tools/tools.token'
import { SubstringService } from '@lumin/shared/substring/substring.service'
import { FilesPreviewListItemComponent } from '../files-preview-list-item/files-preview-list-item.component'
import { getFileExtension } from '@lumin/shared/tools/getFileExtension/getFileExtension'

type ComputeSubstringReturnType = ReturnType<SubstringService['computeSubstring']>

@Component({
  standalone: true,
  imports: [FilesPreviewListComponent],
  template: `
    <app-files-preview-list [files]="files()" (remove)="onRemove($event)">
      @switch (contentState()) {
        @case ('hasContentFallback') {
          <ng-template #fallbackBlock>
            <p>Ups... There should be a at least one file</p>
          </ng-template>
        }
        @case ('empty') {}
      }
    </app-files-preview-list>
  `,
})
class TestComponent {
  files = input<File[] | null>(null)
  contentState = signal<'hasContentFallback' | 'empty'>('empty')
  removeEvent: string | null = null

  onRemove(filename: string) {
    this.removeEvent = filename
  }
}

const exampleImagePreviewUrl = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`

describe('FilesPreviewListComponent', () => {
  // Mocks
  const imageCacheServiceMock = {
    IMAGE_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp'],
    generateUniqueKey: jest.fn(),
    get: jest.fn(),
    push: jest.fn(),
  }
  const textSubstringServiceMock = {
    get: jest.fn(),
    computeSubstring: jest.fn(),
    push: jest.fn(),
  }
  const utilsProvidersMock = {
    createObjectUrl: jest.fn(),
    getFileExtension: jest.fn(),
  }

  // Component
  let fixture: ComponentFixture<TestComponent>
  let wrapperComponent: TestComponent
  let component: FilesPreviewListComponent

  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        {
          provide: ImageCacheService,
          useValue: imageCacheServiceMock,
        },
        {
          provide: SubstringService,
          useValue: textSubstringServiceMock,
        },
        {
          provide: UTILS_PROVIDERS,
          useValue: utilsProvidersMock,
        },
      ] as Provider[],
    })

    fixture = TestBed.createComponent(TestComponent)
    wrapperComponent = fixture.componentInstance
    fixture.detectChanges()

    component = fixture.debugElement.query(
      By.directive(FilesPreviewListComponent)
    ).componentInstance
  })

  it('should create', () => {
    expect(wrapperComponent).toBeTruthy()
    expect(component).toBeTruthy()
  })

  it(`should apply the HorizontalScrollDirective to the unordered list.`, () => {
    // Act
    const ref = fixture.debugElement.query(By.css(`ul[appHorizontalScroll]`)).componentInstance

    // Assert
    expect(ref).toBeTruthy()
  })

  it(`should use the empty content fallback template if the readFiles returns null or empty array.`, async () => {
    // Arrange
    fixture.componentRef.setInput('files', null)
    wrapperComponent.contentState.set('empty')
    await fixture.whenStable()

    // Act
    const ulContent = fixture.debugElement.queryAll(By.css(`[data-test="files-preview-list"] > *`))

    // Assert
    expect(ulContent.length).toBe(0)
  })

  it(`should use the content fallback template provided by developer if the readFiles returns an array with File objects.`, async () => {
    // Arrange
    fixture.componentRef.setInput('files', [])
    wrapperComponent.contentState.set('hasContentFallback')
    fixture.detectChanges()
    await fixture.whenStable()

    // Act
    const ulContent = fixture.debugElement.queryAll(By.css(`[data-test="files-preview-list"] > *`))

    // Assert
    expect(ulContent.length).toBe(1)
    expect(ulContent[0].nativeElement.textContent).toBe(
      'Ups... There should be a at least one file'
    )
  })

  it(`should show a full list with all files from the readFiles.`, async () => {
    // Arrange
    textSubstringServiceMock.get = jest.fn((key: string) => key)
    utilsProvidersMock.getFileExtension = jest.fn(() => 'txt')
    imageCacheServiceMock.get = jest.fn(() => ({
      url: 'https://example.com/image.png',
      lastModified: new Date().getTime(),
    }))
    utilsProvidersMock.createObjectUrl = jest.fn(() => exampleImagePreviewUrl)
    fixture.componentRef.setInput('files', [new File([], 'test.txt', {})])
    wrapperComponent.contentState.set('empty')
    fixture.detectChanges()
    await fixture.whenStable()

    // Act
    const ulContent = fixture.debugElement.queryAll(By.css(`[data-test="files-preview-list"] > *`))

    // Assert
    expect(ulContent.length).toBe(1)
    expect((ulContent[0].nativeElement as HTMLLIElement).tagName).toBe('LI')
  })

  it(`should emit the remove event when a file is removed.`, async () => {
    // Arrange
    const filename = 'test.txt'
    fixture.componentRef.setInput('files', [new File([], filename, {})])
    fixture.detectChanges()
    await fixture.whenStable()

    // Act
    const removeButton = fixture.debugElement
      .query(By.directive(FilesPreviewListItemComponent))
      .query(By.css('button')).nativeElement as HTMLButtonElement

    removeButton.click()

    await fixture.whenStable()

    // Assert
    expect(wrapperComponent.removeEvent).toBe(filename)
  })

  it(`should differentiate between image and other file types.`, async () => {
    // Arrange
    utilsProvidersMock.getFileExtension = jest.fn((file: File) => getFileExtension(file)) // return original function
    const imageFile = new File(['image data'], 'image.jpg', { type: 'image/jpeg' })
    const otherFile = new File(['text data'], 'document.txt', { type: 'text/plain' })
    fixture.componentRef.setInput('files', [imageFile, otherFile])
    fixture.detectChanges()
    await fixture.whenStable()

    // Act
    const listItems = fixture.debugElement
      .queryAll(By.directive(FilesPreviewListItemComponent))
      .map((el) => el.componentInstance as FilesPreviewListItemComponent)

    // Assert
    expect(listItems[0].fileType()).toBe('image')
    expect(listItems[1].fileType()).toBe('other')
  })

  it(`should apply the block class to the host element when files are present.`, async () => {
    // Arrange
    fixture.componentRef.setInput('files', [new File([], 'test.txt', {})])
    fixture.detectChanges()
    await fixture.whenStable()

    // Act
    const hostElement = fixture.debugElement.query(By.directive(FilesPreviewListComponent))
      .nativeElement as HTMLElement

    // Assert
    expect(hostElement.classList.contains('block')).toBe(true)
  })

  it(`should handle multiple files correctly.`, async () => {
    // Arrange
    const files = [
      new File([], 'file1.jpg', { type: 'image/jpeg' }),
      new File([], 'file2.txt', { type: 'text/plain' }),
      new File([], 'file3.png', { type: 'image/png' }),
    ]
    fixture.componentRef.setInput('files', files)
    fixture.detectChanges()
    await fixture.whenStable()

    // Act
    const listItems = fixture.debugElement.queryAll(By.directive(FilesPreviewListItemComponent))

    // Assert
    expect(listItems.length).toBe(3)
  })

  describe(`getImage()`, () => {
    it(`should return the cached image url if it exists and lastModified property is equal.`, async () => {
      // Arrange
      utilsProvidersMock.createObjectUrl.mockClear()
      const lastModified = Date.now()
      imageCacheServiceMock.generateUniqueKey = jest.fn((file: File) =>
        ImageCacheService.prototype.generateUniqueKey(file)
      )
      imageCacheServiceMock.get = jest.fn(
        () =>
          ({
            url: exampleImagePreviewUrl,
            lastModified,
          }) satisfies ImageCacheValue
      )

      const file = new File([], 'example.png', { lastModified, type: 'image/png' })

      // Act
      const result = component['getImage'](file)

      // Assert
      expect(typeof result === 'string').toBeTruthy()
      expect(utilsProvidersMock.createObjectUrl).not.toHaveBeenCalled()
    })

    it(`should return null if imageUrl is falsy.`, async () => {
      // Arrange
      const lastModified = Date.now()
      imageCacheServiceMock.generateUniqueKey = jest.fn((file: File) =>
        ImageCacheService.prototype.generateUniqueKey(file)
      )
      utilsProvidersMock.createObjectUrl = jest.fn(() => null)
      const spy = imageCacheServiceMock.push

      const file = new File([], 'example.png', { lastModified, type: 'image/png' })

      // Act
      const result = component['getImage'](file)

      // Assert
      expect(typeof result === 'string').toBeFalsy()
      expect(spy).not.toHaveBeenCalled()
    })

    it(`should return a new created image url if it doesn't exist in ImageCacheService instance.`, async () => {
      // Arrange
      const lastModified = Date.now()
      imageCacheServiceMock.generateUniqueKey = jest.fn((file: File) =>
        ImageCacheService.prototype.generateUniqueKey(file)
      )
      utilsProvidersMock.createObjectUrl = jest.fn(() => `Example image url`)

      const file = new File([], 'example.png', { lastModified, type: 'image/png' })

      // Act
      const result = component['getImage'](file)

      // Assert
      expect(typeof result === 'string').toBeTruthy()
      expect(imageCacheServiceMock.push).toHaveBeenCalled()
    })
  })

  describe(`getFileName()`, () => {
    it(`should generate a substring cache entry and return it.`, async () => {
      // Arrange
      const STRING_LENGTH = 12
      const lastModified = Date.now()
      const filename = 'example.jpeg'
      const file = new File([], filename, { lastModified, type: 'image/jpeg' })

      textSubstringServiceMock.get = jest.fn(() => undefined)
      textSubstringServiceMock.computeSubstring = jest.fn(
        (): ComputeSubstringReturnType => ({
          accessKey: `${filename}-${STRING_LENGTH}`,
          data: { name: filename, truncated: false },
        })
      )
      fixture.detectChanges()
      await fixture.whenStable()

      // Act
      const result = component['getFileName'](file)

      // Assert
      expect(textSubstringServiceMock.computeSubstring).toHaveBeenCalledWith(
        file.name,
        STRING_LENGTH
      )
      expect(result.name).toBe(filename)
      expect(result.truncated).toBe(false)
    })
  })
})
