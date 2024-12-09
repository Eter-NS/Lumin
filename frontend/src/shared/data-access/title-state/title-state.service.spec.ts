/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing'

import { TitleStateService } from './title-state.service'

describe('TitleStateService', () => {
  let service: TitleStateService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(TitleStateService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe(`getTitle`, () => {
    it(`should return a value returned by readonlyCurrentTitle`, () => {
      // Arrange
      const readonlyCurrentTitleSpy = jest
        .spyOn(service, 'readonlyCurrentTitle' as any)
        .mockReturnValue('Example-title')

      // Act & Assert
      expect(service.getTitle()).toBe('Example-title')
      expect(readonlyCurrentTitleSpy).toHaveBeenCalled()
    })
  })

  describe(`getTitleAsSignal`, () => {
    it(`should return a reference to readonly signal`, () => {
      // Arrange
      const readonlyCurrentTitleSpy = jest.spyOn(service, 'readonlyCurrentTitle' as any)

      // Act & Assert
      expect(service.getTitleAsSignal()).toBe(readonlyCurrentTitleSpy)
    })
  })

  describe(`setTitle`, () => {
    it(`should update _currentTitle signal`, () => {
      // Arrange
      const setSpy = jest.spyOn(service['_currentTitle'], 'set')
      const newTitle = 'Example-title'

      // Act
      service.setTitle(newTitle)

      // Assert
      expect(setSpy).toHaveBeenCalledWith(newTitle)
    })
  })
})
