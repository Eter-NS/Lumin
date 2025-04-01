import { Component, DebugElement } from '@angular/core'
import { HorizontalScrollDirective } from './horizontal-scroll.directive'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

@Component({
  standalone: true,
  selector: `app-test`,
  imports: [HorizontalScrollDirective],
  template: `
    <main appHorizontalScroll data-test="directive-host">
      <section data-test="child-element">1</section>
      <section data-test="child-element">2</section>
      <section data-test="child-element">3</section>
      <section data-test="child-element">4</section>
      <section data-test="child-element">5</section>
    </main>
  `,
})
class TestComponent {}

describe('HorizontalScrollDirective', () => {
  let fixture: ComponentFixture<TestComponent>
  let component: TestComponent
  let directive: HorizontalScrollDirective

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    })

    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
    component

    fixture.detectChanges()

    directive = fixture.debugElement.query(
      By.directive(HorizontalScrollDirective)
    ).componentInstance
  })

  it('should create an instance', () => {
    expect(directive).toBeTruthy()
  })

  let mainRef: DebugElement
  let childrenRefs: DebugElement[]

  beforeEach(() => {
    mainRef = fixture.debugElement.query(By.css(`[data-test="directive-host"]`))
    childrenRefs = fixture.debugElement.queryAll(By.css(`[data-test="child-element"]`))
  })

  it(`should prevent default behavior.`, async () => {
    // Arrange
    const testingElements = [
      mainRef,
      childrenRefs[0],
      childrenRefs[2],
      childrenRefs[childrenRefs.length - 1],
    ]
    const mockWheelEvent = new WheelEvent('wheel', { bubbles: true, cancelable: true })
    mockWheelEvent.preventDefault = jest.fn()

    // Act
    testingElements.forEach((el) => {
      ;(el.nativeElement as HTMLElement).dispatchEvent(mockWheelEvent)
      fixture.detectChanges()
    })

    await fixture.whenStable()

    // Assert
    expect(mockWheelEvent.preventDefault).toHaveBeenCalledTimes(testingElements.length)
  })

  it(`should scroll programmatically when "wheel" event occurs.`, async () => {
    // Arrange
    const testingElements = [
      mainRef,
      childrenRefs[0],
      childrenRefs[2],
      childrenRefs[childrenRefs.length - 1],
    ]
    const shift = 30
    const mockWheelEvent = new WheelEvent('wheel', {
      bubbles: true,
      cancelable: true,
      deltaY: shift,
    })

    // Act
    testingElements.forEach((el) => {
      ;(el.nativeElement as HTMLElement).dispatchEvent(mockWheelEvent)
      fixture.detectChanges()
    })

    await fixture.whenStable()

    // Assert
    mainRef = fixture.debugElement.query(By.css('[data-test="directive-host"]'))
    expect((mainRef.nativeElement as HTMLElement).scrollLeft).toBe(testingElements.length * shift)
  })
})
