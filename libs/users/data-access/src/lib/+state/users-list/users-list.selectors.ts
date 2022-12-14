import { UsersListState } from '@gixer/users/util';
import { createSelector } from '@ngrx/store';
import { featureSelector } from '../users.selectors';

export const getUsersListState = createSelector(
  featureSelector,
  (state) => state.usersList,
);

export const getUsersItems = createSelector(
  getUsersListState,
  (state: UsersListState) => state.items,
);

export const getUsersTotalCount = createSelector(
  getUsersListState,
  (state: UsersListState) => state.total_count,
);

export const getUsersLoaded = createSelector(
  getUsersListState,
  (state: UsersListState) => state.loaded,
);

export const getUsersError = createSelector(
  getUsersListState,
  (state: UsersListState) => state.error,
);
