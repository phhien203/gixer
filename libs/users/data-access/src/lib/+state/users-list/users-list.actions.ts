import { SearchUsersResponse, UsersListCriteriaState } from '@gixer/users/util';
import { createAction, props } from '@ngrx/store';

export const LoadUsers = createAction(
  '[Users Page] Load Users',
  props<UsersListCriteriaState>(),
);

export const LoadUsersSuccess = createAction(
  '[Users/API] Load Users Success',
  props<SearchUsersResponse>(),
);

export const LoadUsersFailure = createAction(
  '[Users/API] Load Users Failure',
  props<{ error: string }>(),
);
