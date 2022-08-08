import { createAction, props } from '@ngrx/store';
import { UsersListCriteriaState } from '../users-list-criteria/users-list-criteria.reducer';
import { UsersResponse } from '../users.models';

export const loadUsers = createAction(
  '[Users Page] Load Users',
  props<UsersListCriteriaState>(),
);

export const loadUsersSuccess = createAction(
  '[Users/API] Load Users Success',
  props<UsersResponse>(),
);

export const loadUsersFailure = createAction(
  '[Users/API] Load Users Failure',
  props<{ error: string }>(),
);
