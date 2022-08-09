import { SearchUsersResponse } from './search-users-response.model';

export interface UsersListState extends SearchUsersResponse {
  readonly loaded: boolean;
  readonly error?: string | null;
}
