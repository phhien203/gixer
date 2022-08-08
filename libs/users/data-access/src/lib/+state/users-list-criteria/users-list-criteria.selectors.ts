import { createSelector } from '@ngrx/store';
import { featureSelector } from '../users.selectors';

export const getUsersListCriteriaState = createSelector(
  featureSelector,
  (state) => state.usersListCriteria,
);

export const getUsersListCriteriaPage = createSelector(
  getUsersListCriteriaState,
  (state) => state.page,
);
