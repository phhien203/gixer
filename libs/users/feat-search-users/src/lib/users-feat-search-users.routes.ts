import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import {
  usersEffects,
  usersReducers,
  USERS_FEATURE_KEY,
} from '@gixer/users/data-access';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsersFeatSearchUsersComponent } from './users-feat-search-users.component';

export const UsersFeatSearchUsersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UsersFeatSearchUsersComponent,
      },
    ],
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(USERS_FEATURE_KEY, usersReducers),
        EffectsModule.forFeature(usersEffects),
      ),
    ],
  },
];
