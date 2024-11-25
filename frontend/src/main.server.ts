import { bootstrapApplication } from '@angular/platform-browser'
import { RootComponent } from 'core/feature/root/root.component'
import { config } from './core/feature/root/root.config.server'

const bootstrap = () => bootstrapApplication(RootComponent, config)

export default bootstrap
