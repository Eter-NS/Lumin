/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, DebugElement, Renderer2, signal } from '@angular/core'
import { TextareaAutoResizeDirective } from './textarea-auto-resize.directive'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

@Component({
  standalone: true,
  imports: [TextareaAutoResizeDirective],
  template: `<textarea appTextareaAutoResize></textarea>`,
})
class TestComponent {
  minRowsOverride = signal<number | null>(null)
  maxRowsOverride = signal<number | null>(null)
}

describe('TextareaAutoResizeDirective', () => {
  // Component
  let fixture: ComponentFixture<TestComponent>
  let directiveElementRef: DebugElement

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    })

    fixture = TestBed.createComponent(TestComponent)
    fixture.detectChanges()

    directiveElementRef = fixture.debugElement.query(By.directive(TextareaAutoResizeDirective))
  })

  it('should create an instance', () => {
    // Assert
    expect(directiveElementRef).toBeTruthy()
  })

  it(`should call \`onKeyup\` method when keyup event occurs.`, () => {
    // Arrange
    const onKeyupSpy = jest.spyOn(TextareaAutoResizeDirective.prototype as any, 'onKeyup')
    const event = new KeyboardEvent('keyup', {
      bubbles: true,
      key: 'k',
    })

    // Act
    directiveElementRef.nativeElement.dispatchEvent(event)
    fixture.detectChanges()

    // Assert
    expect(onKeyupSpy).toHaveBeenCalled()
  })

  describe(`onKeyup()`, () => {
    it(`should call _showScrollbar if the new height is greater than maxHeightInPixels.`, () => {
      // Arrange
      const event = new KeyboardEvent('keyup', {
        bubbles: true,
        key: 'k',
      })
      jest
        .spyOn(TextareaAutoResizeDirective.prototype as any, '_calculateNewHeight')
        .mockReturnValue(120)
      jest
        .spyOn(TextareaAutoResizeDirective.prototype as any, '_getMaxHeightInPixels')
        .mockReturnValue(110)

      const showScrollbarSpy = jest.spyOn(
        TextareaAutoResizeDirective.prototype as any,
        '_showScrollbar'
      )

      // Act
      directiveElementRef.nativeElement.dispatchEvent(event)
      fixture.detectChanges()

      // Assert
      expect(showScrollbarSpy).toHaveBeenCalled()
    })

    it(`should call _hideScrollbar if the new height is not greater than maxHeightInPixels.`, () => {
      // Arrange
      const event = new KeyboardEvent('keyup', {
        bubbles: true,
        key: 'k',
      })
      jest
        .spyOn(TextareaAutoResizeDirective.prototype as any, '_calculateNewHeight')
        .mockReturnValue(120)
      jest
        .spyOn(TextareaAutoResizeDirective.prototype as any, '_getMaxHeightInPixels')
        .mockReturnValue(130)

      const hideScrollbarSpy = jest.spyOn(
        TextareaAutoResizeDirective.prototype as any,
        '_hideScrollbar'
      )

      // Act
      directiveElementRef.nativeElement.dispatchEvent(event)
      fixture.detectChanges()

      // Assert
      expect(hideScrollbarSpy).toHaveBeenCalled()
    })
  })

  describe(`_calculateNewHeight()`, () => {
    it(`should return the new height in as number of pixels.`, () => {
      // Act
      const result = TextareaAutoResizeDirective.prototype['_calculateNewHeight'](
        fixture.nativeElement
      )

      // Assert
      expect(typeof result).toBe('number')
    })
  })

  describe(`_getMaxHeightInPixels()`, () => {
    it(`should return the maximum height of the element provided as the parameter.`, () => {
      // Act
      const result = TextareaAutoResizeDirective.prototype['_getMaxHeightInPixels'](
        fixture.nativeElement
      )

      // Assert
      expect(typeof result).toBe('number')
    })
  })

  describe(`_showScrollbar()`, () => {
    it(`should remove 'hide-scrollbar' class and add 'show-scrollbar'.`, () => {
      // Arrange
      const removeClassSpy = jest.spyOn(directiveElementRef.injector.get(Renderer2), 'removeClass')
      const addClassSpy = jest.spyOn(directiveElementRef.injector.get(Renderer2), 'addClass')
      const element = document.createElement('div')
      element.classList.add(`hide-scrollbar`)

      // Act
      directiveElementRef.injector.get(TextareaAutoResizeDirective)['_showScrollbar'](element)

      // Assert
      expect(element.classList.contains(`show-scrollbar`)).toBeTruthy()
      expect(removeClassSpy).toHaveBeenCalledWith(element, `hide-scrollbar`)
      expect(addClassSpy).toHaveBeenCalledWith(element, `show-scrollbar`)
    })
  })

  describe(`_hideScrollbar()`, () => {
    it(`should remove 'show-scrollbar' class and add 'hide-scrollbar'.`, () => {
      // Arrange
      const removeClassSpy = jest.spyOn(directiveElementRef.injector.get(Renderer2), 'removeClass')
      const addClassSpy = jest.spyOn(directiveElementRef.injector.get(Renderer2), 'addClass')
      const element = document.createElement('div')
      element.classList.add(`show-scrollbar`)

      // Act
      directiveElementRef.injector.get(TextareaAutoResizeDirective)['_hideScrollbar'](element)

      // Assert
      expect(element.classList.contains(`hide-scrollbar`)).toBeTruthy()
      expect(removeClassSpy).toHaveBeenCalledWith(element, `show-scrollbar`)
      expect(addClassSpy).toHaveBeenCalledWith(element, `hide-scrollbar`)
    })
  })
})
