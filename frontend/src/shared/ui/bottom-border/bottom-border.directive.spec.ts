import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { By } from '@angular/platform-browser'
import { BottomBorderDirective } from './bottom-border.directive'

@Component({
  standalone: true,
  imports: [BottomBorderDirective],
  template: `<input appBottomBorder type="text" name="test-input" id="test-input" />`,
})
class TestComponent {}

describe('BottomBorderDirective', () => {
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

  it(`should apply BottomBorderDirective to the element.`, () => {
    // Act
    directiveElement = fixture.debugElement.query(By.css(`[appBottomBorder]`))
      .nativeElement as HTMLElement

    // Assert
    expect(directiveElement).toBeTruthy()
  })
})
