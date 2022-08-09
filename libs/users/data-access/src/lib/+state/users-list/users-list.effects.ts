import { inject, Injectable } from '@angular/core';
import {
  UserModel,
  UsersListCriteriaState,
  UsersResponse,
} from '@gixer/users/util';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  filter,
  forkJoin,
  map,
  of,
  skip,
  switchMap,
  takeUntil,
  zip,
} from 'rxjs';
import { UserApiService } from '../../services/user-api.service';
import { usernameChanges } from '../users-list-criteria/users-list-criteria.actions';
import { getUsersListCriteriaState } from '../users-list-criteria/users-list-criteria.selectors';
import {
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
} from './users-list.actions';

@Injectable()
export class UsersListEffects {
  readonly #store = inject(Store);
  readonly #actions$ = inject(Actions);
  readonly #apiService = inject(UserApiService);

  init$ = createEffect(() => {
    return this.#store.select(getUsersListCriteriaState).pipe(
      skip(1),
      map((usersListCriteria) => loadUsers(usersListCriteria)),
    );
  });

  resetUsersList$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(loadUsers),
      filter(
        (usersListCriteria: UsersListCriteriaState) =>
          usersListCriteria.username === '',
      ),
      map(() => {
        return loadUsersSuccess({
          items: [],
          total_count: 0,
        });
      }),
    );
  });

  loadUsersList$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(loadUsers),
      filter(
        (usersListCriteria: UsersListCriteriaState) =>
          usersListCriteria.username !== '',
      ),
      switchMap((usersListCriteria: UsersListCriteriaState) => {
        return this.#apiService
          .findByUsername(usersListCriteria.username, usersListCriteria.page)
          .pipe(
            switchMap((res: UsersResponse) => {
              return zip(
                of(res),
                res.total_count === 0
                  ? of([])
                  : forkJoin([
                      ...res.items.map((item) =>
                        this.#apiService.getUserDescription(item.login),
                      ),
                    ]),
              );
            }),
            map(([res, users]: [UsersResponse, UserModel[]]) => {
              return loadUsersSuccess({
                total_count: res.total_count,
                items: res.items.map((item: UserModel, idx: number) => {
                  return {
                    ...item,
                    ...users[idx],
                  };
                }),
                message: res.total_count === 0 ? 'No users found' : null,
              });
            }),
            takeUntil(this.#actions$.pipe(ofType(usernameChanges), skip(1))),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            catchError((err: any) => {
              console.error(err);
              return of(
                loadUsersFailure({ error: err?.message ?? 'Error occurs' }),
              );
            }),
          );
      }),
    );
  });
}
