import { UsersListState } from '@gixer/users/util';
import { Action, createReducer, on } from '@ngrx/store';

import * as UsersActions from './users-list.actions';

const initialUsersListState: UsersListState = {
  items: [],
  total_count: 0,
  loaded: true,
  error: null,
};

const reducer = createReducer(
  initialUsersListState,
  on(UsersActions.LoadUsers, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    UsersActions.LoadUsersSuccess,
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
  on(UsersActions.LoadUsersFailure, (state, { error }) => ({
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
