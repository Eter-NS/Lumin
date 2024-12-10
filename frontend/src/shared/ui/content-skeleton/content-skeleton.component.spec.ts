import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ContentSkeletonComponent } from './content-skeleton.component'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'

// @Component({
//   standalone: true,
//   imports: [ContentSkeletonComponent],
//   template: ` <app-content-skeleton [rows]="rows()" /> `,
// })
// class TestComponent {
//   rows = input<number>()
// }

describe('ContentSkeletonComponent', () => {
  let component: ContentSkeletonComponent
  let fixture: ComponentFixture<ContentSkeletonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentSkeletonComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ContentSkeletonComponent)
    fixture.detectChanges()
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe(`inputs`, () => {
    it(`should set height for the whole component.`, () => {
      // Arrange
      const heightClass = 'h-64'
      fixture.componentRef.setInput('blockHeight', heightClass)
      fixture.detectChanges()

      // Act
      const classList = (fixture.debugElement.nativeElement as Element).classList

      // Assert
      expect(classList.contains(heightClass)).toBeTruthy()
    })

    it(`should create 4 dynamic rows after setting 'rows' input to 4.`, () => {
      // Arrange
      const numberOfRows = 4
      fixture.componentRef.setInput('rows', numberOfRows)
      fixture.detectChanges()

      // Act
      const rowElements = fixture.debugElement.queryAll(
        By.css(`[data-test="skeleton-dynamic-row"]`)
      )

      // Assert
      expect(rowElements.length).toEqual(numberOfRows)
    })

    it(`should set color of the skeleton stripes.`, () => {
      // Arrange
      const colorClass = 'bg-red-500'
      fixture.componentRef.setInput('color', colorClass)
      fixture.detectChanges()

      // Act
      const dynamicRowElements = fixture.debugElement.queryAll(
        By.css(`[data-test="skeleton-dynamic-row"] > *`)
      )
      const staticRowElements = fixture.debugElement.queryAll(
        By.css(`[data-test="skeleton-static-row"]`)
      )

      // Assert
      const checkFn = (debugElement: DebugElement) => {
        return (debugElement.nativeElement as Element).classList.contains(colorClass)
      }
      expect(dynamicRowElements.every(checkFn)).toBeTruthy()
      expect(staticRowElements.every(checkFn)).toBeTruthy()
    })

    it(`should set animation styles for the whole component.`, () => {
      // Arrange
      const animationConfigClasses = 'animate-ping duration-300 delay-150'
      fixture.componentRef.setInput('animationConfig', animationConfigClasses)
      fixture.detectChanges()

      // Act
      const classList = (fixture.debugElement.nativeElement as Element).classList

      // Assert
      expect(
        animationConfigClasses
          .split(' ')
          .every((animationClass) => classList.contains(animationClass))
      ).toBeTruthy()
    })
  })
})
