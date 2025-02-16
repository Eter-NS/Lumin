import { InjectionToken } from '@angular/core'
import { formatTime } from './formatTime/formatTime'
import { generateId } from './generateId/generateId'
import { isId } from './isId/isId'
import { isValueChangeEvent } from './isValueChangeEvent/isValueChangeEvent'

export const UTILS_PROVIDERS = new InjectionToken('Utility Functions', {
  providedIn: 'root',
  factory: () => ({
    formatTime,
    generateId,
    isId,
    isValueChangeEvent,
  }),
})
