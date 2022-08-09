import { inject, Injectable } from '@angular/core';
import {
  SearchUsersResponse,
  UserModel,
  UsersListCriteriaState,
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
import { UsernameChanges } from '../users-list-criteria/users-list-criteria.actions';
import { getUsersListCriteriaState } from '../users-list-criteria/users-list-criteria.selectors';
import {
  LoadUsers,
  LoadUsersFailure,
  LoadUsersSuccess,
} from './users-list.actions';

@Injectable()
export class UsersListEffects {
  readonly #store = inject(Store);
  readonly #actions$ = inject(Actions);
  readonly #apiService = inject(UserApiService);

  init$ = createEffect(() => {
    return this.#store.select(getUsersListCriteriaState).pipe(
      skip(1),
      map((usersListCriteria) => LoadUsers(usersListCriteria)),
    );
  });

  resetUsersList$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(LoadUsers),
      filter(
        (usersListCriteria: UsersListCriteriaState) =>
          usersListCriteria.username === '',
      ),
      map(() => {
        return LoadUsersSuccess({
          items: [],
          total_count: 0,
        });
      }),
    );
  });

  loadUsersList$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(LoadUsers),
      filter(
        (usersListCriteria: UsersListCriteriaState) =>
          usersListCriteria.username !== '',
      ),
      switchMap((usersListCriteria: UsersListCriteriaState) => {
        return this.#apiService
          .findByUsername(usersListCriteria.username, usersListCriteria.page)
          .pipe(
            switchMap((res: SearchUsersResponse) => {
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
            map(([res, users]: [SearchUsersResponse, UserModel[]]) => {
              return LoadUsersSuccess({
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
            takeUntil(this.#actions$.pipe(ofType(UsernameChanges), skip(1))),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            catchError((err: any) => {
              return of(
                LoadUsersFailure({ error: err?.message ?? 'Error occurs' }),
              );
            }),
          );
      }),
    );
  });
}
