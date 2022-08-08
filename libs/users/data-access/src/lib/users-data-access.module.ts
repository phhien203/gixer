import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { usersEffects } from './+state/users.effects';
import { usersReducers, USERS_FEATURE_KEY } from './+state/users.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(USERS_FEATURE_KEY, usersReducers),
    EffectsModule.forFeature(usersEffects),
  ],
})
export class UsersDataAccessModule {}
