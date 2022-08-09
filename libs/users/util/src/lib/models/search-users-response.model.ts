import { UserModel } from './user.model';

export interface SearchUsersResponse {
  readonly items: readonly UserModel[];
  readonly total_count: number;
  readonly message?: string | null;
}
