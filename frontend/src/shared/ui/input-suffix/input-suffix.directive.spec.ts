import { Component } from '@angular/core'
import { InputSuffixDirective } from './input-suffix.directive'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

@Component({
  standalone: true,
  imports: [InputSuffixDirective],
  template: ` <button type="submit" appInputSuffix>Hello World!</button> `,
})
class TestComponent {}

describe('InputSuffixDirective', () => {
  // Component && directive
  let fixture: ComponentFixture<TestComponent>
  let directiveElement: HTMLLabelElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    })

    fixture = TestBed.createComponent(TestComponent)
    fixture.detectChanges()

    directiveElement = fixture.debugElement.query(By.directive(InputSuffixDirective))
      .nativeElement as HTMLLabelElement
  })

  it(`should apply InputSuffixDirective.`, () => {
    // Assert
    expect(directiveElement).toBeTruthy()
  })
})
