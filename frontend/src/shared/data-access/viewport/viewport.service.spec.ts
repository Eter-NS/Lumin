import { fakeAsync, TestBed, tick } from '@angular/core/testing'

import { ViewportService } from './viewport.service'
import { BehaviorSubject } from 'rxjs'
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'
import { Provider } from '@angular/core'

describe('ViewportService', () => {
  const observeSubject = new BehaviorSubject<BreakpointState>({ matches: true } as BreakpointState)
  const breakpointObserverMock = {
    observe: jest.fn((query: string) => {
      query
      return observeSubject.asObservable()
    }),
  }

  // Service
  let service: ViewportService

  beforeEach(() => {
    observeSubject.next({ matches: true } as BreakpointState)
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BreakpointObserver,
          useValue: breakpointObserverMock,
        },
      ] as Provider[],
    })
    service = TestBed.inject(ViewportService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe(`isMobile$`, () => {
    it(`should emit value after subscribing to the Observable.`, fakeAsync(() => {
      // Arrange

      // Act
      let resultValue: boolean | undefined
      const subscription = service.isMobile$.subscribe((value) => {
        resultValue = value
      })

      tick()
      subscription.unsubscribe()

      if (resultValue === undefined) {
        throw new Error('No value received from the observable')
      }

      // Assert
      expect(resultValue).toBe(true)
    }))

    it(`should emit value after query match status changes.`, fakeAsync(() => {
      // Act
      let resultValue: boolean | undefined
      const subscription = service.isMobile$.subscribe((value) => {
        resultValue = value
      })

      tick()
      if (resultValue === undefined) {
        throw new Error('No value received from the observable')
      }

      expect(resultValue).toBe(true)

      observeSubject.next({ matches: false } as BreakpointState)
      tick()
      subscription.unsubscribe()

      // Assert
      expect(resultValue).toBe(false)
    }))
  })
})
