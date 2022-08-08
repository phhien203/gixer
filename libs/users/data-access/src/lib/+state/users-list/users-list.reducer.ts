import { UsersResponse } from '@gixer/users/util';
import { Action, createReducer, on } from '@ngrx/store';

import * as UsersActions from './users-list.actions';

export interface UsersListState extends UsersResponse {
  readonly loaded: boolean;
  readonly error?: string | null;
}

export const initialUsersState: UsersListState = {
  items: [],
  total_count: 0,
  loaded: true,
  error: null,
};

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(UsersActions.loadUsersSuccess, (state, { items, total_count }) => {
    return total_count === 0
      ? {
          items,
          total_count,
          loaded: true,
          error: 'No users found',
        }
      : {
          items,
          total_count,
          loaded: true,
          error: null,
        };
  }),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function usersListReducer(
  state: UsersListState | undefined,
  action: Action,
) {
  return reducer(state, action);
}
