import { Routes } from '@angular/router';
import { UsersFeatSearchUsersComponent } from '@gixer/users/feat-search-users';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersFeatSearchUsersComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/users',
  },
];
