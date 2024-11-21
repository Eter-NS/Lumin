import { Route } from '@angular/router'

export const appRoutes: Route[] = [
  {
    path: 'app',
    loadChildren: () => import('@lumin/app/shell/app.routes').then((r) => r.appRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('@lumin/auth/shell/auth.routes').then((r) => r.authRoutes),
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'app',
    pathMatch: 'full',
  },
]
