import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SvgFileIconComponent } from './svg-file-icon.component'
import { Provider } from '@angular/core'
import { LoggerService } from '@lumin/shared/logger/logger.service'

describe('SvgFileIconComponent', () => {
  // Mocks
  const loggerServiceMock = {
    log: jest.fn(),
  }

  // Component
  let component: SvgFileIconComponent
  let fixture: ComponentFixture<SvgFileIconComponent>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SvgFileIconComponent],
      providers: [
        {
          provide: LoggerService,
          useValue: loggerServiceMock,
        },
      ] as Provider[],
    })

    fixture = TestBed.createComponent(SvgFileIconComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    // Act & Assert
    expect(component).toBeTruthy()
  })

  it('should set default size to "small" and text to "docx".', () => {
    // Arrange
    const expectedSize = 64
    const expectedText = 'docx'

    // Act & Assert
    expect(component['computedSize']()).toBe(expectedSize)
    expect(component['fontSize']()).toBe('text-base')
    expect(component.text()).toBe(expectedText)
  })

  it('should set size to "large" and text to "docx".', async () => {
    // Arrange
    const expectedSize = 144
    const expectedText = 'docx'

    // Act
    fixture.componentRef.setInput('size', 'large')
    fixture.detectChanges()
    await fixture.whenStable()

    // Assert
    expect(component['computedSize']()).toBe(expectedSize)
    expect(component['fontSize']()).toBe('text-4xl')
    expect(component.text()).toBe(expectedText)
  })

  it('should handle invalid size input and log error.', async () => {
    // Arrange
    const expectedSize = 64
    const incorrectSize = 'medium'

    // Act
    fixture.componentRef.setInput('size', incorrectSize)
    fixture.detectChanges()
    await fixture.whenStable()

    // Assert
    expect(component['computedSize']()).toBe(expectedSize)
    expect(loggerServiceMock.log).toHaveBeenCalledWith(
      'error',
      `Provided size in SvgFileIconComponent is not valid, expected "small" or "large", received "${incorrectSize}". Moving the size to "small".`
    )
  })

  it('should handle empty size input and log error.', async () => {
    // Arrange
    const expectedSize = 64
    const incorrectSize = ''

    // Act
    fixture.componentRef.setInput('size', incorrectSize)
    fixture.detectChanges()
    await fixture.whenStable()

    // Assert
    expect(component['computedSize']()).toBe(expectedSize)
    expect(loggerServiceMock.log).toHaveBeenCalledWith(
      'error',
      `Provided size in SvgFileIconComponent is not valid, expected "small" or "large", received "${incorrectSize}". Moving the size to "small".`
    )
  })

  it(`should calculate correct viewBox based on the size input value.`, async () => {
    // Arrange
    const testCases = [
      { size: 'small', expectedResult: `0 0 64 64` },
      { size: 'large', expectedResult: `0 0 144 144` },
    ]

    for await (const test of testCases) {
      // Act
      fixture.componentRef.setInput('size', test.size)
      await fixture.whenStable()

      // Assert
      expect(component['viewBox']()).toBe(test.expectedResult)
    }
  })

  it(`should calculate correct filePath based on the size input value.`, async () => {
    // Arrange
    const ORIGINAL_SIZE = 64
    const smallScale = 64 / ORIGINAL_SIZE
    const largeScale = 144 / ORIGINAL_SIZE

    const testCases = [
      {
        size: 'small',
        expectedResult: `M${7 * smallScale} ${54.4 * smallScale}V${9.6 * smallScale}C${7 * smallScale} ${4.2976 * smallScale} ${11.2808 * smallScale} 0 ${16.5625 * smallScale} 0H${38.875 * smallScale}L${58 * smallScale} ${19.2 * smallScale}V${54.4 * smallScale}C${58 * smallScale} ${59.7024 * smallScale} ${53.7192 * smallScale} ${64 * smallScale} ${48.4375 * smallScale} ${64 * smallScale}H${16.5625 * smallScale}C${11.2808 * smallScale} ${64 * smallScale} ${7 * smallScale} ${59.7024 * smallScale} ${7 * smallScale} ${54.4 * smallScale}Z`,
      },
      {
        size: 'large',
        expectedResult: `M${7 * largeScale} ${54.4 * largeScale}V${9.6 * largeScale}C${7 * largeScale} ${4.2976 * largeScale} ${11.2808 * largeScale} 0 ${16.5625 * largeScale} 0H${38.875 * largeScale}L${58 * largeScale} ${19.2 * largeScale}V${54.4 * largeScale}C${58 * largeScale} ${59.7024 * largeScale} ${53.7192 * largeScale} ${64 * largeScale} ${48.4375 * largeScale} ${64 * largeScale}H${16.5625 * largeScale}C${11.2808 * largeScale} ${64 * largeScale} ${7 * largeScale} ${59.7024 * largeScale} ${7 * largeScale} ${54.4 * largeScale}Z`,
      },
    ]

    for await (const test of testCases) {
      // Act
      fixture.componentRef.setInput('size', test.size)
      await fixture.whenStable()

      // Assert
      expect(component['filePath']()).toBe(test.expectedResult)
    }
  })

  it(`should calculate correct fontSize based on the size input value.`, async () => {
    // Arrange
    const testCases = [
      {
        size: 'small',
        expectedResult: 'text-base',
      },
      {
        size: 'large',
        expectedResult: 'text-4xl',
      },
      {
        size: 'incorrect',
        expectedResult: 'text-base',
      },
    ]

    for await (const test of testCases) {
      // Act
      fixture.componentRef.setInput('size', test.size)
      await fixture.whenStable()

      // Assert
      expect(component['fontSize']()).toBe(test.expectedResult)
    }
  })
})
