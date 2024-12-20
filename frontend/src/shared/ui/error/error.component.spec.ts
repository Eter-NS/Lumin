import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ErrorComponent } from './error.component'
import { Component, input } from '@angular/core'
import { By } from '@angular/platform-browser'

@Component({
  standalone: true,
  imports: [ErrorComponent],
  template: `
    <app-error>
      <ng-template #errorMessage>
        <p data-test="error-message-example-element">Example message error</p>
      </ng-template>
      @if (showAction()) {
        <ng-template #action>
          <button type="button" data-test="action-example-element">Try again</button>
        </ng-template>
      }
    </app-error>
  `,
})
class TestComponent {
  showAction = input(false)
}

describe('ErrorComponent', () => {
  let fixture: ComponentFixture<TestComponent>
  let testComponent: TestComponent
  let component: ErrorComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TestComponent)
    testComponent = fixture.componentInstance
    fixture.detectChanges()

    component = fixture.debugElement.query(By.directive(ErrorComponent)).componentInstance
  })

  it('should create', () => {
    expect(testComponent).toBeTruthy()
    expect(component).toBeTruthy()
  })

  it(`should display the error message (required).`, () => {
    // Act
    const errorMessageRef = fixture.debugElement.query(
      By.css(`[data-test="error-message-example-element"]`)
    )

    // Assert
    expect(component.errorMessage()).toBeTruthy()
    expect(errorMessageRef).toBeTruthy()
  })

  it(`should not display action element when not provided.`, () => {
    // Arrange
    fixture.componentRef.setInput('showAction', false)
    fixture.detectChanges()

    // Act
    const actionBlockRef = fixture.debugElement.query(
      By.css(`[data-test="action-example-element"]`)
    )

    // Assert
    expect(component.action()).not.toBeTruthy()
    expect(actionBlockRef).not.toBeTruthy()
  })

  it(`should display action element when provided.`, () => {
    // Arrange
    fixture.componentRef.setInput('showAction', true)
    fixture.detectChanges()

    // Act
    const actionBlockRef = fixture.debugElement.query(
      By.css(`[data-test="action-example-element"]`)
    )

    // Assert
    expect(component.action()).toBeTruthy()
    expect(actionBlockRef).toBeTruthy()
  })
})
