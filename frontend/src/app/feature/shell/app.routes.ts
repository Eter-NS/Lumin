import { Route } from '@angular/router'

export const appRoutes: Route[] = [
  {
    path: 'chat-library',
    loadComponent: () =>
      import('../chat-library/chat-library.component').then((c) => c.ChatLibraryComponent),
  },
  {
    path: 'settings',
    loadComponent: () => import('../settings/settings.component').then((c) => c.SettingsComponent),
  },
  {
    path: '',
    loadComponent: () => import('../chat/chat.component').then((c) => c.ChatComponent),
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
]
