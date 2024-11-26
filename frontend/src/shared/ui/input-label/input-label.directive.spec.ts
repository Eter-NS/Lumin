import { Component, input } from '@angular/core'
import { InputLabelDirective } from './input-label.directive'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

@Component({
  standalone: true,
  imports: [InputLabelDirective],
  template: ` <label appInputLabel [hidden]="hide()">Hello World!</label> `,
})
class TestComponent {
  hide = input(false)
}

describe('InputLabelDirective', () => {
  // Component && directive
  let fixture: ComponentFixture<TestComponent>
  let directiveElement: HTMLLabelElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    })

    fixture = TestBed.createComponent(TestComponent)
    fixture.detectChanges()

    directiveElement = fixture.debugElement.query(By.directive(InputLabelDirective))
      .nativeElement as HTMLLabelElement
  })

  it(`should apply InputLabelDirective.`, () => {
    // Assert
    expect(directiveElement).toBeTruthy()
  })

  it(`should not apply the sr-class when hidden is false.`, () => {
    // Assert
    expect(directiveElement.classList.contains('sr-only')).toBeFalsy()
  })

  it(`should  apply the sr-class when hidden is true.`, () => {
    // Arrange
    fixture.componentRef.setInput('hide', true)

    // Act
    fixture.detectChanges()

    // Assert
    expect(directiveElement.classList.contains('sr-only')).toBeTruthy()
  })
})
