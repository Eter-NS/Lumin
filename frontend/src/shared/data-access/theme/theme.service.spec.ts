/* eslint-disable @typescript-eslint/no-explicit-any */
import { fakeAsync, TestBed, tick } from '@angular/core/testing'
import { ThemeService } from './theme.service'
import { EnvironmentCheckToken } from '@lumin/shared/injection-tokens/environment-check/environment-check.token'
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'
import { BehaviorSubject } from 'rxjs'
import { BrowserTheme } from '@lumin/shared/models/browserTheme.type'
import { Provider } from '@angular/core'
import { LocalStorageController } from '../local-storage-controller/local-storage-controller.service'
import { AppTheme } from '@lumin/shared/models/appTheme.type'

function createInstance() {
  return TestBed.inject(ThemeService)
}

describe('ThemeService - server', () => {
  // Service
  let service: ThemeService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = createInstance()
  })

  beforeEach(() => {
    // Simulate the server environment
    jest.spyOn(TestBed.inject(EnvironmentCheckToken), 'isPlatformBrowser').mockReturnValue(false)
  })

  it('should be created.', () => {
    expect(service).toBeTruthy()
  })

  it(`should not call _initializeClientTheme in server environment.`, () => {
    // Arrange
    const initializeClientThemeSpy = jest.spyOn(
      ThemeService.prototype as any,
      '_initializeClientTheme'
    )

    // Act
    service = createInstance()

    // Assert
    expect(initializeClientThemeSpy).not.toHaveBeenCalled()
  })
})

describe('ThemeService - browser', () => {
  // Mocks
  const observeSubject = new BehaviorSubject<BreakpointState>({ matches: true } as BreakpointState)
  const breakpointObserverMock = {
    observe: () => observeSubject.asObservable(),
  }

  // Service
  let service: ThemeService

  beforeEach(() => {
    localStorage.clear()
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
    service = createInstance()
  })

  it('should be created.', () => {
    expect(service).toBeTruthy()
  })

  it(`should call _initializeClientTheme in browser environment.`, () => {
    // Arrange
    const initializeClientThemeSpy = jest.spyOn(
      ThemeService.prototype as any,
      '_initializeClientTheme'
    )

    // Act
    service = createInstance()

    // Assert
    expect(initializeClientThemeSpy).toHaveBeenCalled()
  })

  describe(`observables`, () => {
    describe(`_browserTheme`, () => {
      it(`should emit current browser theme.`, fakeAsync(() => {
        // Arrange

        // Act
        service = createInstance()

        let resultValue: BrowserTheme | undefined
        const subscription = service['_browserTheme$'].subscribe((value) => {
          resultValue = value
        })

        tick()
        subscription.unsubscribe()

        // Assert
        expect(resultValue).toBe('dark')
      }))

      it(`should emit a new value when the media query result changes`, fakeAsync(() => {
        // Arrange

        // Act 1
        service = createInstance()

        let resultValue: BrowserTheme | undefined
        const subscription = service['_browserTheme$'].subscribe((value) => {
          resultValue = value
        })

        tick()

        // Assert 1
        expect(resultValue).toBe('dark')

        // Act 2
        observeSubject.next({ matches: false } as BreakpointState)

        tick()
        subscription.unsubscribe()

        // Assert 2
        expect(resultValue).toBe('light')
      }))
    })

    describe(`theme`, () => {
      it(`should propagate new values further when they are different from the current one.`, fakeAsync(() => {
        // Arrange
        const localStorageSetSpy = jest.spyOn(TestBed.inject(LocalStorageController), 'set')

        let resultValue: BrowserTheme | undefined
        const subscription = service.theme$.subscribe((value) => {
          resultValue = value
        })

        tick()

        expect(resultValue).toBe('dark')

        // Act
        service['_themeSubject'].next('auto')

        tick()
        subscription.unsubscribe()

        // Assert
        // Should be called only once because initial value is compared to undefined
        expect(localStorageSetSpy).toHaveBeenCalledTimes(1)
        expect(resultValue).toBe('dark')
      }))

      it(`should return the latest value of _browserTheme$ when theme's value is 'auto'.`, fakeAsync(() => {
        // Arrange
        let browserThemeValue: BrowserTheme | undefined
        let themeValue: BrowserTheme | undefined

        // Act 1
        const subscription = service['_browserTheme$'].subscribe((value) => {
          browserThemeValue = value
        })
        subscription.add(
          service.theme$.subscribe((value) => {
            themeValue = value
          })
        )

        tick()

        // Assert 1
        expect(service['_themeSubject'].value).toBe('auto')
        expect(browserThemeValue).toBe('dark')
        expect(themeValue).toBe('dark')

        // Act 2
        observeSubject.next({ matches: false } as BreakpointState)

        tick()
        subscription.unsubscribe()

        // Assert 2
        expect(browserThemeValue).toBe('light')
        expect(themeValue).toBe('light')
      }))

      it(`should not use the value from _browserTheme$ when _themeSubject's recent value is not 'auto'.`, fakeAsync(() => {
        // Arrange
        service['_themeSubject'].next('dark')
        // To make sure the browser theme is not the same as the one set in next$
        observeSubject.next({ matches: false } as BreakpointState)
        let resultValue: BrowserTheme | undefined

        // Act
        const subscription = service.theme$.subscribe((value) => {
          resultValue = value
        })

        tick()
        subscription.unsubscribe()

        // Assert
        expect(resultValue).toBe('dark')
      }))
    })
  })

  describe(`methods`, () => {
    describe(`selectNewTheme`, () => {
      it(`should pass a new value to _themeSubject.`, () => {
        // Arrange
        const nextSpy = jest.spyOn(service['_themeSubject'], 'next')

        // Act
        service.selectNewTheme('light')

        // Assert
        expect(nextSpy).toHaveBeenCalledWith('light')
      })
    })

    describe(`_initializeClientTheme`, () => {
      it(`should call 'selectNewTheme' if a user has a theme token stored in LocalStorage.`, () => {
        // Arrange
        const themeTokenValue: AppTheme = 'dark'
        localStorage.setItem('APP_THEME', themeTokenValue)
        const selectNewThemeSpy = jest.spyOn(service, 'selectNewTheme')

        // Act
        service['_initializeClientTheme']()

        // Assert
        expect(selectNewThemeSpy).toHaveBeenCalledWith(themeTokenValue)
      })
    })
  })
})
