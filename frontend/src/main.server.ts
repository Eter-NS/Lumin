import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from 'core/feature/root/root.component'
import { config } from './core/feature/root/root.config.server'

const bootstrap = () => bootstrapApplication(AppComponent, config)

export default bootstrap
