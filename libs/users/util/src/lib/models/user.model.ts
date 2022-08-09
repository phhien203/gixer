export interface UserModel {
  readonly id: number;
  readonly login: string;
  readonly html_url: string;
  readonly avatar_url: string;
  readonly bio?: string | null;
  readonly name?: string | null;
  readonly location?: string | null;
  readonly following?: number | null;
  readonly followers?: number | null;
  readonly blog?: string | null;
}
