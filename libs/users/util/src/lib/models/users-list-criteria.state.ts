import { DEFAULT_PAGE_SIZE } from '../constants';

export interface UsersListCriteriaState {
  username: string;
  page: number;
  per_page: number;
}

export const usersListCriteriaInitialState: UsersListCriteriaState = {
  username: '',
  page: 0,
  per_page: DEFAULT_PAGE_SIZE,
};
