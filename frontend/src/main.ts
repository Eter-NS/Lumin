import { bootstrapApplication } from '@angular/platform-browser'
import { appConfig } from './core/feature/root/root.config'
import { AppComponent } from './core/feature/root/root.component'

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err))
