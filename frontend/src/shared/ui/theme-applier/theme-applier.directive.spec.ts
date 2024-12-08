/* eslint-disable @typescript-eslint/no-explicit-any */
import { fakeAsync, flush, TestBed } from '@angular/core/testing'
import { ThemeApplierDirective } from './theme-applier.directive'
import { ThemeService } from '@lumin/shared/theme/theme.service'
import { Provider, Renderer2 } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { BrowserTheme } from 'shared/utils/models/browserTheme.type'
import { DOCUMENT } from '@angular/common'

describe('ThemeApplierDirective', () => {
  // Mocks
  const themeSubject = new BehaviorSubject<BrowserTheme>('dark')
  const themeServiceMock = {
    theme$: themeSubject.asObservable(),
  } as unknown as ThemeService

  const rendererMock = {
    removeClass: jest.fn(),
    addClass: jest.fn(),
  } as unknown as Renderer2

  // Directive
  let directive: ThemeApplierDirective

  beforeEach(() => {
    ;(rendererMock.removeClass as jest.Mock).mockClear()
    ;(rendererMock.addClass as jest.Mock).mockClear()
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ThemeService, useValue: themeServiceMock },
        { provide: Renderer2, useValue: rendererMock },
      ] as Provider[],
    })

    TestBed.runInInjectionContext(() => {
      directive = new ThemeApplierDirective()
    })
  })

  it('should create an instance', () => {
    expect(directive).toBeTruthy()
  })

  it('should set app theme listener on ngAfterViewInit if platform is browser.', fakeAsync(() => {
    const setAppThemeListenerSpy = jest.spyOn(directive, '_setAppThemeListener' as any)
    const toggleAppThemeSpy = jest.spyOn(directive, '_toggleAppTheme' as any)

    // Act
    directive.ngAfterViewInit()
    flush()

    // Assert
    expect(setAppThemeListenerSpy).toHaveBeenCalledTimes(1)
    expect(toggleAppThemeSpy).toHaveBeenCalledTimes(1)
    expect(toggleAppThemeSpy).toHaveBeenCalledWith('dark')
  }))

  describe(`_setAppThemeListener`, () => {
    it(`should should toggle app theme when theme changes.`, fakeAsync(() => {
      // Arrange
      const toggleAppThemeSpy = jest.spyOn(directive, '_toggleAppTheme' as any)

      // Act 1
      directive.ngAfterViewInit()
      flush()

      // Assert 1
      expect(toggleAppThemeSpy).toHaveBeenCalledWith('dark')

      // Act 2
      themeSubject.next('light')
      flush()

      // Assert 2
      expect(toggleAppThemeSpy).toHaveBeenCalledWith('light')
    }))
  })

  describe(`_toggleAppTheme`, () => {
    it(`should clear all theme classes and add a new one.`, () => {
      // Act
      directive['_toggleAppTheme']('dark')

      // Assert
      expect(rendererMock.removeClass).toHaveBeenCalledTimes(2)
      expect(rendererMock.addClass).toHaveBeenCalledWith(
        TestBed.inject(DOCUMENT).documentElement,
        'dark'
      )
    })
  })
})
