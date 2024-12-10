import { Type } from '@angular/core'

export interface RoutingLink {
  routerLink: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: Type<any>
  linkText: string
}
