import { ComponentFixture, TestBed } from '@angular/core/testing'
import { InputDirective } from './input.directive'
import { Component, input } from '@angular/core'
import { By } from '@angular/platform-browser'

@Component({
  standalone: true,
  imports: [InputDirective],
  template: `
    <input
      appInput
      [overrideStyles]="customClass()"
      type="text"
      name="test-input"
      id="test-input"
    />
    <textarea
      appInput
      [overrideStyles]="customClass()"
      name="test-textarea"
      id="test-textarea"
    ></textarea>
  `,
})
class TestComponent {
  customClass = input<string>('')
}

describe('InputDirective', () => {
  // Component && directive
  let fixture: ComponentFixture<TestComponent>
  let directiveElement: HTMLElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    })

    fixture = TestBed.createComponent(TestComponent)
    fixture.detectChanges()
  })

  it(`should apply InputDirective to input element.`, () => {
    // Act
    directiveElement = fixture.debugElement.query(By.css(`input[appInput]`))
      .nativeElement as HTMLElement

    // Assert
    expect(directiveElement).toBeTruthy()
  })

  it(`should apply InputDirective to textarea element.`, () => {
    // Act
    directiveElement = fixture.debugElement.query(By.css(`textarea[appInput]`))
      .nativeElement as HTMLElement

    // Assert
    expect(directiveElement).toBeTruthy()
  })

  it(`should apply custom classes if passed.`, () => {
    // Arrange
    fixture.componentRef.setInput('customClass', 'example-class-1')

    // Act
    fixture.detectChanges()
    directiveElement = fixture.debugElement.query(By.css(`textarea[appInput]`))
      .nativeElement as HTMLElement

    // Assert
    expect(directiveElement.classList.contains('example-class-1')).toBeTruthy()
  })
})
