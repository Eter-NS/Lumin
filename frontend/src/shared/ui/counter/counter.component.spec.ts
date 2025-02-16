import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CounterComponent } from './counter.component'

describe('CounterComponent', () => {
  let component: CounterComponent
  let fixture: ComponentFixture<CounterComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CounterComponent)
    component = fixture.componentInstance
    fixture.componentRef.setInput('time', null)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
    expect(component.time()).toBeNull()
  })

  describe(`bad config`, () => {
    it(`should show nothing if the input value is null.`, () => {
      // Arrange

      // Act
      const value = fixture.nativeElement.innerHTML

      // Assert
      expect(value).toBe('')
    })

    it(`should show nothing if the input value is a number below 0.`, () => {
      // Arrange
      fixture.componentRef.setInput('time', -1)
      fixture.detectChanges()

      // Act
      const value = fixture.nativeElement.innerHTML

      // Assert
      expect(value).toBe('')
    })
  })

  describe(`seconds`, () => {
    it(`should show "00:0{number}" if the input is a number (less than 10 seconds).`, () => {
      // Arrange
      fixture.componentRef.setInput('time', 3)
      fixture.detectChanges()

      // Act
      const value = fixture.nativeElement.innerHTML

      // Assert
      expect(value).toBe('00:03')
    })

    it(`should show "00:{number}" if the input is a number (more than 10 seconds, less than 60).`, () => {
      // Arrange
      fixture.componentRef.setInput('time', 42)
      fixture.detectChanges()

      // Act
      const value = fixture.nativeElement.innerHTML

      // Assert
      expect(value).toBe('00:42')
    })
  })

  describe(`minutes`, () => {
    it(`should show "0{number}:{number}" if the input is a number (more than 60 seconds, less than 10 minutes).`, () => {
      // Arrange
      fixture.componentRef.setInput('time', 5 * 60 + 15)
      fixture.detectChanges()

      // Act
      const value = fixture.nativeElement.innerHTML

      // Assert
      expect(value).toBe('05:15')
    })

    it(`should show "{number}:{number}" if the input is a number (more than 10 minutes).`, () => {
      // Arrange
      fixture.componentRef.setInput('time', 15 * 60 + 15)
      fixture.detectChanges()

      // Act
      const value = fixture.nativeElement.innerHTML

      // Assert
      expect(value).toBe('15:15')
    })
  })
})
