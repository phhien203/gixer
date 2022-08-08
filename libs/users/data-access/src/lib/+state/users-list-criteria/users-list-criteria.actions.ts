import { createAction, props } from '@ngrx/store';

export const usernameChanges = createAction(
  '[Users Page] Username changes',
  props<{ username: string }>(),
);

export const usernameChangesDebounced = createAction(
  '[Users Page] Username changes debounced',
  props<{ username: string }>(),
);

export const pageIndexChanges = createAction(
  '[Users Page] Page index changes',
  props<{ page: number }>(),
);
