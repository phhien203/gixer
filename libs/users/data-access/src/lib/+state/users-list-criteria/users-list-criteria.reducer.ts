import { Action, createReducer, on } from '@ngrx/store';
import * as UsersListCriteriaActions from './users-list-criteria.actions';

export interface UsersListCriteriaState {
  username: string;
  page: number;
  per_page: number;
}

const usersListCriteriaInitialState: UsersListCriteriaState = {
  username: '',
  page: 1,
  per_page: 5,
};

const reducer = createReducer(
  usersListCriteriaInitialState,
  on(
    UsersListCriteriaActions.usernameChangesDebounced,
    (state, { username }) => ({
      ...state,
      username,
      page: 1,
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
