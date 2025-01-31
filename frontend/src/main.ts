/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser'
import { appConfig } from './core/feature/root/root.config'
import { RootComponent } from './core/feature/root/root.component'

bootstrapApplication(RootComponent, appConfig).catch((err) => console.error(err))
