/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FileInputComponent } from './file-input.component'
import { Component, input, Provider } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'

// Wrapper component for testing
@Component({
  template: `
    <form [formGroup]="form">
      <app-file-input formControlName="fileControl" [accept]="accept()" [multiple]="multiple()" />
    </form>
  `,
  standalone: true,
  imports: [FileInputComponent, ReactiveFormsModule],
})
class TestWrapperComponent {
  accept = input('image/*')
  multiple = input(false)

  form = new FormGroup({
    fileControl: new FormControl<File[] | null>(null),
  })
}

const createMockFile = (name: string, size: number, type: string): File => {
  const blob = new Blob(['a'.repeat(size)], { type })
  return new File([blob], name, { type })
}

describe('FileInputComponent', () => {
  let component: FileInputComponent
  let fixture: ComponentFixture<TestWrapperComponent>
  let wrapperComponent: TestWrapperComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileInputComponent, TestWrapperComponent],
      providers: [] as Provider[],
    }).compileComponents()

    fixture = TestBed.createComponent(TestWrapperComponent)
    wrapperComponent = fixture.componentInstance
    component = fixture.debugElement.query(By.directive(FileInputComponent)).componentInstance
    fixture.detectChanges()
  })

  it('should create.', () => {
    expect(component).toBeTruthy()
  })

  it('should update the form control value when a file is selected.', () => {
    // Arrange
    const file = createMockFile('test.jpg', 1024, 'image/jpeg')
    const fileList = {
      0: file,
      length: 1,
      item: (index: number) => (index === 0 ? file : null),
    } as unknown as FileList

    const inputElement = fixture.debugElement.query(By.css('[data-test="file-input-ref"]'))
    const event = { target: { files: fileList } }

    // Act
    inputElement.triggerEventHandler('input', event)
    fixture.detectChanges()

    // Assert
    expect(wrapperComponent.form.controls.fileControl.value).toEqual([file])
  })

  it('should set the form control value to null when the `files` value is null.', () => {
    // Arrange
    component['_value'] = []

    const inputElement = fixture.debugElement.query(By.css('[data-test="file-input-ref"]'))
    const event = { target: {} }

    // Act
    inputElement.triggerEventHandler('input', event)
    fixture.detectChanges()

    // Assert
    expect(wrapperComponent.form.controls.fileControl.value).toEqual(null)
  })

  it('should set the form control value to null when no files are selected.', () => {
    // Arrange
    const fileList = {
      length: 0,
      item: (index: number) => null,
    } as unknown as FileList

    const inputElement = fixture.debugElement.query(By.css('[data-test="file-input-ref"]'))
    const event = { target: { files: fileList } }

    // Act
    inputElement.triggerEventHandler('input', event)
    fixture.detectChanges()

    // Assert
    expect(wrapperComponent.form.controls.fileControl.value).toEqual(null)
  })

  it('should set the form control to touched on button focus.', () => {
    // Arrange
    const button = fixture.debugElement.query(
      By.css('[data-test="file-input-button"]')
    ).nativeElement

    // Act
    button.focus()

    // Assert
    expect(wrapperComponent.form.controls.fileControl.touched).toBeTruthy()
  })

  it('should disable the input when the control is disabled.', () => {
    // Arrange
    const button = fixture.debugElement.query(
      By.css('[data-test="file-input-button"]')
    ).nativeElement
    const input = fixture.debugElement.query(By.css('[data-test="file-input-ref"]')).nativeElement

    // Act
    wrapperComponent.form.controls.fileControl.disable()
    fixture.detectChanges()

    // Assert
    expect(component['disabled']()).toBe(true)
    expect(button.disabled).toBe(true)
    expect(input.disabled).toBe(true)
  })

  it('should enable the input when the control is enabled.', () => {
    // Arrange
    const button = fixture.debugElement.query(
      By.css('[data-test="file-input-button"]')
    ).nativeElement
    const input = fixture.debugElement.query(By.css('[data-test="file-input-ref"]')).nativeElement
    wrapperComponent.form.controls.fileControl.disable()
    fixture.detectChanges()

    // Act
    wrapperComponent.form.controls.fileControl.enable()
    fixture.detectChanges()

    // Assert
    expect(component['disabled']()).toBe(false)
    expect(button.disabled).toBe(false)
    expect(input.disabled).toBe(false)
  })

  it('should not update value if the control is disabled.', () => {
    // Arrange
    const file = createMockFile('test.jpg', 1024, 'image/jpeg')
    const fileList = {
      0: file,
      length: 1,
      item: (index: number) => (index === 0 ? file : null),
    } as unknown as FileList

    wrapperComponent.form.controls.fileControl.disable()
    fixture.detectChanges()

    const initialValue = wrapperComponent.form.controls.fileControl.value
    const inputElement = fixture.debugElement.query(By.css('[data-test="file-input-ref"]'))
    const event = { target: { files: fileList } }

    // Act
    inputElement.triggerEventHandler('input', event)
    fixture.detectChanges()

    // Assert
    expect(wrapperComponent.form.controls.fileControl.value).toEqual(initialValue)
  })

  it('should propagate multiple files when multiple input is true.', () => {
    // Arrange
    const file1 = createMockFile('test1.jpg', 1024, 'image/jpeg')
    const file2 = createMockFile('test2.jpg', 2048, 'image/jpeg')
    const fileList = {
      0: file1,
      1: file2,
      length: 2,
      item: (index: number) => (index === 0 ? file1 : file2),
    } as unknown as FileList

    fixture.componentRef.setInput('multiple', true)
    fixture.detectChanges()

    const inputElement = fixture.debugElement.query(By.css('[data-test="file-input-ref"]'))
    const event = { target: { files: fileList } }

    // Act
    inputElement.triggerEventHandler('input', event)
    fixture.detectChanges()

    // Assert
    expect(wrapperComponent.form.controls.fileControl.value).toEqual([file1, file2])
  })

  it('should accept provided file types.', () => {
    // Arrange
    fixture.componentRef.setInput('accept', 'image/jpeg')
    fixture.detectChanges()
    const inputElement = fixture.debugElement.query(
      By.css('[data-test="file-input-ref"]')
    ).nativeElement

    // Act and Assert
    expect(inputElement.accept).toBe('image/jpeg')
  })

  it('should write value correctly.', () => {
    // Arrange
    const file1 = createMockFile('test1.jpg', 1024, 'image/jpeg')

    // Act
    component.writeValue([file1])

    // Assert
    expect(component['_value']).toEqual([file1])
  })

  it(`should reset the stored input value when \`resetValue()\` is called.`, () => {
    // Arrange
    component['_value'] = []

    // Act
    component['resetValue']()

    // Assert
    expect(component['_value']).toBe(null)
  })
})
