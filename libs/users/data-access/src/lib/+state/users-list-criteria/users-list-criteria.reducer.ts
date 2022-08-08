import {
  usersListCriteriaInitialState,
  UsersListCriteriaState,
} from '@gixer/users/util';
import { Action, createReducer, on } from '@ngrx/store';
import * as UsersListCriteriaActions from './users-list-criteria.actions';

const reducer = createReducer(
  usersListCriteriaInitialState,
  on(
    UsersListCriteriaActions.usernameChangesDebounced,
    (state, { username }) => ({
      ...state,
      username,
      page: 0,
    }),
  ),
  on(UsersListCriteriaActions.pageIndexChanges, (state, { page }) => ({
    ...state,
    page,
  })),
);

export function usersListCriteriaReducer(
  state: UsersListCriteriaState | undefined,
  action: Action,
) {
  return reducer(state, action);
}
