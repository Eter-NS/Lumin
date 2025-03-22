import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ChatFormFieldComponent } from './chat-form-field.component'
import { By } from '@angular/platform-browser'
import { Component, signal } from '@angular/core'
import { InputLabelDirective } from '@lumin/shared/input-label/input-label.directive'
import { InputDirective } from '@lumin/shared/input/input.directive'
import { InputSuffixDirective } from '@lumin/shared/input-suffix/input-suffix.directive'

@Component({
  standalone: true,
  imports: [ChatFormFieldComponent, InputLabelDirective, InputDirective, InputSuffixDirective],
  template: `
    <app-chat-form-field>
      @if (showContent()) {
        <ng-template #content>
          <div data-test="projected-content" class="xyz-example">
            Hello, I'm projected from parent!
          </div>
        </ng-template>
      }
      @if (showIncorrectContent()) {
        <ng-template #notCorrectTemplateName>
          <div data-test="incorrect-content">I think I shouldn't be here...</div>
        </ng-template>
      }
    </app-chat-form-field>
  `,
})
class TestComponent {
  showContent = signal(false)
  showIncorrectContent = signal(false)
}

describe('ChatFormFieldComponent', () => {
  let component: ChatFormFieldComponent
  let fixture: ComponentFixture<ChatFormFieldComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChatFormFieldComponent, TestComponent],
    })

    fixture = TestBed.createComponent(ChatFormFieldComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe(`inputs`, () => {
    it(`should replace the default TailwindCSS classes when parent component passes override classes in the \`borderBackground\` input.`, () => {
      // Arrange
      const newClass = 'bg-red-100'
      fixture.componentRef.setInput('borderBackground', newClass)
      fixture.detectChanges()

      // Act
      const decorativeBorderRef = fixture.debugElement.query(
        By.css(`[data-test="decorative-border-element"]`)
      )

      // Assert
      expect(decorativeBorderRef).toBeTruthy()
      expect(decorativeBorderRef.classes[newClass]).toBeTruthy()
    })

    it(`should replace the default TailwindCSS classes when parent component passes override classes in the \`innerBackground\` input.`, () => {
      // Arrange
      const newClass = 'bg-green-500'
      fixture.componentRef.setInput('innerBackground', newClass)
      fixture.detectChanges()

      // Act
      const formFieldContentWrapperRef = fixture.debugElement.query(
        By.css(`[data-test="form-field-content-wrapper"]`)
      )

      // Assert
      expect(formFieldContentWrapperRef).toBeTruthy()
      expect(formFieldContentWrapperRef.classes[newClass]).toBeTruthy()
    })

    it(`should replace the default TailwindCSS classes when parent component passes override classes in the \`textColor\` input.`, () => {
      // Arrange
      const newClass = 'bg-cyan-900'
      fixture.componentRef.setInput('textColor', newClass)
      fixture.detectChanges()

      // Act
      const formFieldContentWrapperRef = fixture.debugElement.query(
        By.css(`[data-test="form-field-content-wrapper"]`)
      )

      // Assert
      expect(formFieldContentWrapperRef).toBeTruthy()
      expect(formFieldContentWrapperRef.classes[newClass]).toBeTruthy()
    })

    it(`should replace the default TailwindCSS classes when parent component passes override classes in the \`overrideStyles\` input.`, () => {
      // Arrange
      const newClass = 'grid'
      fixture.componentRef.setInput('overrideStyles', newClass)
      fixture.detectChanges()

      // Act
      const formFieldContentWrapperRef = fixture.debugElement.query(
        By.css(`[data-test="form-field-content-wrapper"]`)
      )

      // Assert
      expect(formFieldContentWrapperRef).toBeTruthy()
      expect(formFieldContentWrapperRef.classes[newClass]).toBeTruthy()
    })
  })

  describe(`content projection`, () => {
    it(`should display the content projected from ng-template with #content.`, () => {
      // Arrange
      const parentFixture = TestBed.createComponent(TestComponent)
      const parentComponent = parentFixture.componentInstance
      parentComponent.showContent.set(true)
      parentFixture.detectChanges()

      // Act
      const projectedContent = parentFixture.debugElement.query(
        By.css(`[data-test="projected-content"]`)
      )
      const contentFallback = parentFixture.debugElement.query(
        By.css(`[data-test="content-fallback"]`)
      )

      // Assert
      expect(projectedContent).toBeTruthy()
      expect(
        (projectedContent.nativeElement.textContent as string).trim().includes('Hello')
      ).toBeTruthy()
      expect(contentFallback).toBeFalsy()
    })

    it(`should display the fallback content if the ng-template is not sent with correct name or doesn't exist.`, () => {
      // Arrange
      const parentFixture = TestBed.createComponent(TestComponent)
      const parentComponent = parentFixture.componentInstance
      parentComponent.showIncorrectContent.set(true)
      parentFixture.detectChanges()

      // Act
      const contentFallback = parentFixture.debugElement.query(
        By.css(`[data-test="content-fallback"]`)
      )
      const incorrectContent = parentFixture.debugElement.query(
        By.css(`[data-test="incorrect-content"]`)
      )

      // Assert
      expect(contentFallback).toBeTruthy()
      expect(incorrectContent).toBeFalsy()
    })
  })

  describe(`template`, () => {
    it(`should render the decorative border positioner with the absolute position.`, () => {
      // Act
      const elementRef = fixture.debugElement.query(
        By.css(`[data-test="decorative-border-positioner"]`)
      )

      // Assert
      expect(elementRef.classes['absolute']).toBeTruthy()
    })

    it(`should render the sibling element with the relative position.`, () => {
      // Act
      const elementRef = fixture.debugElement.query(
        By.css(`[data-test="form-field-content-parent"]`)
      )

      // Assert
      expect(elementRef.classes['relative']).toBeTruthy()
    })

    it(`should render the form field content wrapper with the flex layout.`, () => {
      // Act
      const elementRef = fixture.debugElement.query(
        By.css(`[data-test="form-field-content-wrapper"]`)
      )

      // Assert
      expect(elementRef.classes['flex']).toBeTruthy()
    })

    it(`should render the projected content.`, () => {
      // Arrange
      const parentFixture = TestBed.createComponent(TestComponent)
      const parentComponent = parentFixture.componentInstance
      parentComponent.showContent.set(true)
      parentFixture.detectChanges()

      // Act
      const inputLabelRef = parentFixture.debugElement.query(
        By.css(`[data-test="projected-content"]`)
      )

      // Assert
      expect(inputLabelRef).toBeTruthy()
    })
  })
})
