/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing'

import { NavExpandStateService } from './nav-expand-state.service'
import { EnvironmentCheckToken } from '@lumin/shared/injection-tokens/environment-check/environment-check.token'
import { LocalStorageController } from '../local-storage-controller/local-storage-controller.service'

function getInstance() {
  return TestBed.inject(NavExpandStateService)
}

describe('NavExpandStateService - server', () => {
  let service: NavExpandStateService

  beforeEach(() => {
    localStorage.clear()
  })

  beforeEach(() => {
    TestBed.configureTestingModule({})

    jest.spyOn(TestBed.inject(EnvironmentCheckToken), 'isPlatformBrowser').mockReturnValue(false)

    service = getInstance()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it(`should not call _createConnectionToStorage in server environment.`, () => {
    // Arrange
    const createConnectionToStorageSpy = jest.spyOn(
      NavExpandStateService.prototype as any,
      '_createConnectionToStorage'
    )

    // Act
    service = getInstance()

    // Assert
    expect(createConnectionToStorageSpy).not.toHaveBeenCalled()
  })
})

describe('NavExpandStateService - browser', () => {
  let service: NavExpandStateService

  beforeEach(() => {
    localStorage.clear()
  })

  beforeEach(() => {
    TestBed.configureTestingModule({})

    jest.spyOn(TestBed.inject(EnvironmentCheckToken), 'isPlatformBrowser').mockReturnValue(true)

    service = getInstance()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it(`should call _createConnectionToStorage in browser environment.`, () => {
    // Arrange
    const createConnectionToStorageSpy = jest.spyOn(
      NavExpandStateService.prototype as any,
      '_createConnectionToStorage'
    )

    // Act
    service = getInstance()

    // Assert
    expect(createConnectionToStorageSpy).toHaveBeenCalled()
  })

  describe(`_createConnectionToStorage`, () => {
    it(`should call _loadStateFromStorage and _setupEffectForSavingState.`, () => {
      // Arrange
      const loadStateFromStorageSpy = jest.spyOn(service as any, '_loadStateFromStorage')
      const setupEffectForSavingStateSpy = jest.spyOn(service as any, '_setupEffectForSavingState')

      // Act
      service['_createConnectionToStorage']()

      // Assert
      expect(loadStateFromStorageSpy).toHaveBeenCalled()
      expect(setupEffectForSavingStateSpy).toHaveBeenCalled()
    })
  })

  describe(`_loadStateFromStorage`, () => {
    it(`should not update the state of 'expand' signal when user does not have NAV_EXPAND_STATE token stored in LocalStorage.`, () => {
      // Arrange
      localStorage.clear()
      const setSpy = jest.spyOn(service.expand, 'set')

      // Act
      service['_loadStateFromStorage']()

      // Assert
      expect(setSpy).not.toHaveBeenCalled()
      expect(service.expand()).toBeTruthy()
    })

    it(`should update the state of 'expand' signal when user has stored NAV_EXPAND_STATE token in LocalStorage.`, () => {
      // Arrange
      localStorage.setItem('NAV_EXPAND', JSON.stringify({ state: false }))
      const setSpy = jest.spyOn(service.expand, 'set')

      // Act
      service['_loadStateFromStorage']()

      // Assert
      expect(setSpy).toHaveBeenCalled()
      expect(service.expand()).toBeFalsy()
    })
  })

  describe(`_setupEffectForSavingState`, () => {
    it(`should assign EffectRef to the _saveChangeToStorageRef property.`, () => {
      // Arrange
      service['_saveChangeToStorageRef'] = undefined

      // Act
      TestBed.runInInjectionContext(() => {
        service['_setupEffectForSavingState']()
      })

      // Assert
      expect(service['_saveChangeToStorageRef']).not.toBeUndefined()
    })

    it(`should call LocalStorageController.set each time 'expand' signal value changes.`, () => {
      // Arrange
      service['_saveChangeToStorageRef'] = undefined
      const setSpy = jest.spyOn(TestBed.inject(LocalStorageController), 'set')

      // Act
      TestBed.runInInjectionContext(() => {
        service['_setupEffectForSavingState']()
      })

      service.expand.set(false)
      TestBed.flushEffects()

      // Assert
      expect(setSpy).toHaveBeenCalledWith('NAV_EXPAND', { state: false })
    })
  })
})
