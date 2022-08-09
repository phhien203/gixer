import { createAction, props } from '@ngrx/store';

export const UsernameChanges = createAction(
  '[Users Page] Username changes',
  props<{ username: string }>(),
);

export const UsernameChangesDebounced = createAction(
  '[Users Page] Username changes debounced',
  props<{ username: string }>(),
);

export const PageIndexChanges = createAction(
  '[Users Page] Page index changes',
  props<{ page: number }>(),
);
