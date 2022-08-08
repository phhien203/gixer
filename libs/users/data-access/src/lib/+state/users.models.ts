export interface UserModel {
  readonly id: number;
  readonly login: string;
  readonly html_url: string;
  readonly avatar_url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly [key: string]: any;
}

export interface UsersResponse {
  readonly items: readonly UserModel[];
  readonly total_count: number;
}
