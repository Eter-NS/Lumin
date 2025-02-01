/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'
import { isValueChangeEvent } from './isValueChangeEvent'
import { ValueChangeEvent } from '@angular/forms'

describe('isValueChangeEvent', () => {
  it('should filter non-value change events', () => {
    // Arrange
    const valueChangeEvent = new ValueChangeEvent('example value', {} as AbstractControl)
    const testingSubject = new BehaviorSubject<any>('')
    const emittedValues: unknown[] = []
    const testingValues = ['', null, valueChangeEvent, 'example value', {}, 123, new Map()]

    // Act
    const result$ = testingSubject.asObservable().pipe(isValueChangeEvent<string>())
    const subscription = result$.subscribe((event) => {
      emittedValues.push(event)
    })

    testingValues.forEach((value) => testingSubject.next(value))

    // Assert
    expect(emittedValues).toEqual([valueChangeEvent])

    subscription.unsubscribe()
  })

  it('should return an observable that emits only ValueChangeEvent instances', () => {
    // Arrange
    const valueChangeEvent = new ValueChangeEvent('example value', {} as AbstractControl)
    const testingSubject = new BehaviorSubject<any>(valueChangeEvent)
    const emittedValues: unknown[] = []

    // Act
    const result$ = testingSubject.asObservable().pipe(isValueChangeEvent<string>())
    const subscription = result$.subscribe((event) => {
      emittedValues.push(event)
    })

    // Assert
    expect(emittedValues).toEqual([valueChangeEvent])

    subscription.unsubscribe()
  })

  it('should not emit any events if the input observable is empty', () => {
    // Arrange
    const testingSubject = new BehaviorSubject<any>(null)
    const emittedValues: unknown[] = []

    // Act
    const result$ = testingSubject.asObservable().pipe(isValueChangeEvent<string>())
    const subscription = result$.subscribe((event) => {
      emittedValues.push(event)
    })

    // Assert
    expect(emittedValues).toEqual([])

    subscription.unsubscribe()
  })

  it('should handle multiple ValueChangeEvent instances', () => {
    // Arrange
    const valueChangeEvent1 = new ValueChangeEvent('example value', {} as AbstractControl)
    const valueChangeEvent2 = new ValueChangeEvent('another example value', {} as AbstractControl)
    const testingSubject = new BehaviorSubject<any>('')
    const emittedValues: unknown[] = []

    // Act
    const result$ = testingSubject.asObservable().pipe(isValueChangeEvent<string>())
    const subscription = result$.subscribe((event) => {
      emittedValues.push(event)
    })

    testingSubject.next(valueChangeEvent1)
    testingSubject.next(valueChangeEvent2)

    // Assert
    expect(emittedValues).toEqual([valueChangeEvent1, valueChangeEvent2])

    subscription.unsubscribe()
  })
})
