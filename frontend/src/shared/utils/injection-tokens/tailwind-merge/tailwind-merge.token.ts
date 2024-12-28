import { InjectionToken } from '@angular/core'
import { twMerge } from 'tailwind-merge'

export interface TailwindMerge {
  twMerge: typeof twMerge
}

export const TailwindMergeToken = new InjectionToken<TailwindMerge>('TailwindMergeToken', {
  providedIn: 'root',
  factory() {
    return { twMerge }
  },
})
