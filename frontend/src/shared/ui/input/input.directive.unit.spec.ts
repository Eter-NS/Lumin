import { ComponentFixture, TestBed } from '@angular/core/testing'
import { InputDirective } from './input.directive'
import { Component, DebugElement, input } from '@angular/core'
import { By } from '@angular/platform-browser'

@Component({
  standalone: true,
  imports: [InputDirective],
  template: `
    <p>testing TextArea component</p>

    <form>
      <fieldset>
        <label for="first">An example form label</label>
        <input type="text" name="example1" id="first" />
      </fieldset>

      <button type="submit">Submit form</button>
    </form>
  `,
})
class TestComponent {
  showPlaceholder = input(true)
}

describe('TextAreaComponent', () => {
  let fixture: ComponentFixture<TestComponent>
  let component: TestComponent
  let directive: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    })

    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    directive = fixture.debugElement.query(By.directive(InputDirective))
  })

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy()
  })

  it(`should apply the directive.`, () => {
    // Assert
    expect(directive).toBeTruthy()
  })
})
