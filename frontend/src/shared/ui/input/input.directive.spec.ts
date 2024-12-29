import { ComponentFixture, TestBed } from '@angular/core/testing'
import { InputDirective } from './input.directive'
import { Component } from '@angular/core'
import { By } from '@angular/platform-browser'

@Component({
  standalone: true,
  imports: [InputDirective],
  template: `
    <input appInput type="text" name="test-input" id="test-input" />
    <textarea appInput name="test-textarea" id="test-textarea"></textarea>
  `,
})
class TestComponent {}

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
})
