import { UsersResponse } from './search-users-response.model';

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
