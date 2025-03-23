import { InjectionToken } from '@angular/core'
import { formatTime } from './formatTime/formatTime'
import { generateId } from './generateId/generateId'
import { isId } from './isId/isId'
import { isValueChangeEvent } from './isValueChangeEvent/isValueChangeEvent'
import { createObjectUrl } from './createObjectUrl/createObjectUrl'
import { getFileExtension } from './getFileExtension/getFileExtension'

export type UTILS_PROVIDERS_TYPES = typeof functions

const functions = {
  formatTime,
  generateId,
  isId,
  isValueChangeEvent,
  createObjectUrl,
  getFileExtension,
}

export const UTILS_PROVIDERS = new InjectionToken<UTILS_PROVIDERS_TYPES>('Utility Functions', {
  providedIn: 'root',
  factory: () => functions,
})
