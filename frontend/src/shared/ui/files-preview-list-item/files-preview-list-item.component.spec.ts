import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FilesPreviewListItemComponent } from './files-preview-list-item.component'
import { Component, input } from '@angular/core'
import { By } from '@angular/platform-browser'

@Component({
  standalone: true,
  imports: [FilesPreviewListItemComponent],
  template: `
    @if (fileType() === 'image' && imageUrl()) {
      <app-files-preview-list-item
        [fileType]="fileType()"
        [filename]="filename()"
        [displayname]="displayname()"
        [fileExtension]="fileExtension()"
        [isDisplayNameTruncated]="isDisplayNameTruncated()"
        [imageUrl]="imageUrl()"
        (remove)="onRemove()"
      />
    } @else {
      <app-files-preview-list-item
        [fileType]="fileType()"
        [filename]="filename()"
        [displayname]="displayname()"
        [fileExtension]="fileExtension()"
        [isDisplayNameTruncated]="isDisplayNameTruncated()"
        (remove)="onRemove()"
      />
    }
  `,
})
class WrapperComponent {
  fileType = input<'image' | 'other'>('other')
  filename = input<string>('example.docx')
  displayname = input<string>('example.docx')
  fileExtension = input<string>('docx')
  isDisplayNameTruncated = input<boolean>(false)

  imageUrl = input<string | null>(null)

  onRemove() {
    ;('')
  }
}

describe('FilesPreviewListItemComponent', () => {
  let wrapperComponent: WrapperComponent
  let component: FilesPreviewListItemComponent
  let fixture: ComponentFixture<WrapperComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WrapperComponent],
    })

    fixture = TestBed.createComponent(WrapperComponent)
    wrapperComponent = fixture.componentInstance
    fixture.detectChanges()

    component = fixture.debugElement.query(
      By.directive(FilesPreviewListItemComponent)
    ).componentInstance
  })

  it('should create', () => {
    expect(wrapperComponent).toBeTruthy()
    expect(component).toBeTruthy()
  })

  describe('SvgFileIconComponent', () => {
    it(`should show \`SvgFileIconComponent\` if fileType input is set to 'other'.`, () => {
      // Arrange
      const extension = 'docx'

      fixture.componentRef.setInput('fileType', 'other')
      fixture.componentRef.setInput('fileExtension', extension)

      fixture.detectChanges()

      // Act
      const svgRef = fixture.debugElement.query(By.css(`[data-test="custom-svg-file-icon"]`))
        .nativeElement as HTMLElement
      const imageRef = fixture.debugElement.query(By.css(`[data-test="image-preview"]`))

      // Assert
      expect(svgRef.innerHTML.includes(extension)).toBeTruthy()
      expect(imageRef).toBeFalsy()
    })

    it(`should show 'unknown' text in the \`SvgFileIconComponent\` if fileExtension is nullish.`, () => {
      // Arrange
      const extension = undefined

      fixture.componentRef.setInput('fileType', 'other')
      fixture.componentRef.setInput('fileExtension', extension)

      fixture.detectChanges()

      // Act
      const ref = fixture.debugElement.query(By.css(`[data-test="custom-svg-file-icon"]`))
        .nativeElement as HTMLElement

      // Assert
      expect(ref.innerHTML.includes('unknown')).toBeTruthy()
    })
  })

  describe('image preview', () => {
    it(`should show img tag if fileType input is set to 'image'.`, () => {
      // Arrange
      const imageUrl = 'http://localhost/example-image-url'

      fixture.componentRef.setInput('fileType', 'image')
      fixture.componentRef.setInput('fileExtension', 'jpeg')
      fixture.componentRef.setInput('imageUrl', imageUrl)

      fixture.detectChanges()

      // Act
      const svgRef = fixture.debugElement.query(By.css(`[data-test="custom-svg-file-icon"]`))
      const imageRef = fixture.debugElement.query(By.css(`[data-test="image-preview"]`))
        .nativeElement as HTMLImageElement

      // Assert
      expect(svgRef).toBeFalsy()
      expect(imageRef).toBeTruthy()
      expect(imageRef.src).toBe(imageUrl)
    })

    it(`should assign title attribute to img tag if fileType input is set to 'image'.`, () => {
      // Arrange
      const filename = 'example.jpeg'

      fixture.componentRef.setInput('fileType', 'image')
      fixture.componentRef.setInput('fileExtension', 'jpeg')
      fixture.componentRef.setInput('imageUrl', 'http://localhost/example-image-url')
      fixture.componentRef.setInput('filename', filename)

      fixture.detectChanges()

      // Act
      const ref = fixture.debugElement.query(By.css(`[data-test="image-preview"]`))
        .nativeElement as HTMLImageElement

      // Assert
      expect(ref).toBeTruthy()
      expect(ref.title).toBe(filename)
    })
  })

  it(`should show figcaption tag with displayname input value if isDisplayNameTruncated input value is true.`, () => {
    // Arrange
    const figCaptionText = 'truncatedFi'
    fixture.componentRef.setInput('displayname', figCaptionText)
    fixture.componentRef.setInput('isDisplayNameTruncated', true)

    fixture.detectChanges()

    // Act
    const ref = fixture.debugElement.query(By.css(`[data-test="visible-filename"]`))
      .nativeElement as HTMLElement

    // Assert
    expect(
      ref.textContent?.includes(figCaptionText) && ref.textContent.includes('...')
    ).toBeTruthy()
  })

  it(`should show figcaption tag with filename input value if isDisplayNameTruncated input value is false.`, () => {
    // Arrange
    const figCaptionText = 'example.docx'
    fixture.componentRef.setInput('filename', figCaptionText)
    fixture.componentRef.setInput('isDisplayNameTruncated', false)

    fixture.detectChanges()

    // Act
    const ref = fixture.debugElement.query(By.css(`[data-test="visible-filename"]`))
      .nativeElement as HTMLElement

    // Assert
    expect(ref.textContent).toBe(figCaptionText)
  })

  it(`should show the remove button with text for screen reader annotating the semantic purpose.`, () => {
    // Arrange
    const filename = 'example.jpeg'
    fixture.componentRef.setInput('filename', filename)

    fixture.detectChanges()

    // Act
    const ref = fixture.debugElement.query(
      By.css(`[data-test="remove-item-button"] > [data-test="remove-item-button-sr-text"]`)
    ).nativeElement as HTMLElement

    // Assert
    expect(ref.textContent?.includes('Remove')).toBeTruthy()
    expect(ref.textContent?.includes(filename)).toBeTruthy()
  })

  it(`should emit the \`remove\` event when the remove button is clicked.`, async () => {
    // Arrange
    const spy = jest.spyOn(wrapperComponent, 'onRemove')
    fixture.componentRef.setInput('filename', 'example.jpeg')

    fixture.detectChanges()

    // Act
    const ref = fixture.debugElement.query(By.css(`[data-test="remove-item-button"]`))
      .nativeElement as HTMLElement
    ref.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }))

    await fixture.whenStable()

    // Assert
    expect(spy).toHaveBeenCalled()
  })
})
