import { initialUsersState, UsersListState } from '@gixer/users/util';
import { Action, createReducer, on } from '@ngrx/store';

import * as UsersActions from './users-list.actions';

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    UsersActions.loadUsersSuccess,
    (state, { items, total_count, message }) => {
      return {
        ...state,
        items,
        total_count,
        loaded: true,
        error: message,
      };
    },
  ),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loaded: true,
  })),
);

export function usersListReducer(
  state: UsersListState | undefined,
  action: Action,
) {
  return reducer(state, action);
}
