import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('@gixer/users/feat-search-users').then(
        (m) => m.UsersFeatSearchUsersRoutes,
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/users',
  },
];
