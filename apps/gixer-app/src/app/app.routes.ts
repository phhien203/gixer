import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
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
    redirectTo: '/',
  },
];
