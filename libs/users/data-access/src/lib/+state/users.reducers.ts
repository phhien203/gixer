import { ActionReducerMap } from '@ngrx/store';
import {
  usersListCriteriaReducer,
  UsersListCriteriaState,
} from './users-list-criteria/users-list-criteria.reducer';
import {
  usersListReducer,
  UsersListState,
} from './users-list/users-list.reducer';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
  usersList: UsersListState;
  usersListCriteria: UsersListCriteriaState;
}

export interface State {
  users: UsersState;
}

export const usersReducers: ActionReducerMap<UsersState> = {
  usersList: usersListReducer,
  usersListCriteria: usersListCriteriaReducer,
};
