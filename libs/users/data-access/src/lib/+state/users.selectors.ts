import { createFeatureSelector } from '@ngrx/store';
import { UsersState, USERS_FEATURE_KEY } from './users.reducers';

export const featureSelector =
  createFeatureSelector<UsersState>(USERS_FEATURE_KEY);
