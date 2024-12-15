import { Type } from '@angular/core'
import { IconComponent } from './iconComponent.interface'

export interface RoutingLink {
  routerLink: string
  iconComponent: Type<IconComponent>
  linkText: string
}
