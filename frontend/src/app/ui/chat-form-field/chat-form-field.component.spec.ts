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
    <app-form-field>
      @if (showInputLabelContent()) {
        <label appInputLabel for="exampleInput"></label>
      }
      @if (showInputContent()) {
        <input appInput type="text" id="exampleInput" />
      }
      @if (showInputSuffixContent()) {
        <button appInputSuffix type="submit"></button>
      }
    </app-form-field>
  `,
})
class TestComponent {
  showInputLabelContent = signal(false)
  showInputContent = signal(false)
  showInputSuffixContent = signal(false)
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
      ;('https://www.youtube.com/watch?v=MoRScEseTf4')
    })
  })

  describe(`ng-content`, () => {
    it(`should display the content projected into the \`appInputLabel\` slot.`, () => {
      // Arrange
      const parentFixture = TestBed.createComponent(TestComponent)
      const parentComponent = parentFixture.componentInstance
      parentComponent.showInputLabelContent.set(true)
      parentFixture.detectChanges()

      // Act
      const inputLabelRef = parentFixture.debugElement.query(By.css(`[appInputLabel]`))

      // Assert
      expect(inputLabelRef).toBeTruthy()
    })

    it(`should display the content projected into the \`appInput\` slot.`, () => {
      // Arrange
      const parentFixture = TestBed.createComponent(TestComponent)
      const parentComponent = parentFixture.componentInstance
      parentComponent.showInputContent.set(true)
      parentFixture.detectChanges()

      // Act
      const inputRef = parentFixture.debugElement.query(By.css(`[appInput]`))

      // Assert
      expect(inputRef).toBeTruthy()
    })

    it(`should display the content projected into the \`appInputSuffix\` slot.`, () => {
      // Arrange
      const parentFixture = TestBed.createComponent(TestComponent)
      const parentComponent = parentFixture.componentInstance
      parentComponent.showInputSuffixContent.set(true)
      parentFixture.detectChanges()

      // Act
      const inputSuffixRef = parentFixture.debugElement.query(By.css(`[appInputSuffix]`))

      // Assert
      expect(inputSuffixRef).toBeTruthy()
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

    it(`should render the ng-content elements.`, () => {
      // Arrange
      const parentFixture = TestBed.createComponent(TestComponent)
      const parentComponent = parentFixture.componentInstance
      parentComponent.showInputLabelContent.set(true)
      parentComponent.showInputContent.set(true)
      parentComponent.showInputSuffixContent.set(true)
      parentFixture.detectChanges()

      // Act
      const inputLabelRef = parentFixture.debugElement.query(By.css(`[appInputLabel]`))
      const inputRef = parentFixture.debugElement.query(By.css(`[appInput]`))
      const inputSuffixRef = parentFixture.debugElement.query(By.css(`[appInputSuffix]`))

      // Assert
      expect(inputLabelRef).toBeTruthy()
      expect(inputRef).toBeTruthy()
      expect(inputSuffixRef).toBeTruthy()
    })
  })
})
