import { InjectionToken } from '@angular/core'
import { environment } from 'environments/environment.dev'

export const APP_CONFIG_VALUE = environment
export const APP_CONFIG = new InjectionToken<typeof APP_CONFIG_VALUE>('Application config')
