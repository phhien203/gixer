import { DEFAULT_PAGE_SIZE, UsersListCriteriaState } from '@gixer/users/util';
import { Action, createReducer, on } from '@ngrx/store';
import * as UsersListCriteriaActions from './users-list-criteria.actions';

const usersListCriteriaInitialState: UsersListCriteriaState = {
  username: '',
  page: 0,
  per_page: DEFAULT_PAGE_SIZE,
};

const reducer = createReducer(
  usersListCriteriaInitialState,
  on(
    UsersListCriteriaActions.UsernameChangesDebounced,
    (state, { username }) => ({
      ...state,
      username,
      page: 0,
    }),
  ),
  on(UsersListCriteriaActions.PageIndexChanges, (state, { page }) => ({
    ...state,
    page,
  })),
  on(UsersListCriteriaActions.UserNameQueryChanges, (state, { username }) => ({
    ...state,
    username,
    page: 0,
  })),
);

export function usersListCriteriaReducer(
  state: UsersListCriteriaState | undefined,
  action: Action,
) {
  return reducer(state, action);
}
