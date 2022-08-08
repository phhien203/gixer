import { Injectable } from '@angular/core';
import { UserModel, UsersResponse } from '@gixer/users/util';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  delay,
  filter,
  forkJoin,
  map,
  of,
  skip,
  switchMap,
  takeUntil,
  zip,
} from 'rxjs';
import { UserApiService } from '../../user-api.service';
import { usernameChanges } from '../users-list-criteria/users-list-criteria.actions';
import { UsersListCriteriaState } from '../users-list-criteria/users-list-criteria.reducer';
import { getUsersListCriteriaState } from '../users-list-criteria/users-list-criteria.selectors';
import {
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
} from './users-list.actions';

@Injectable()
export class UsersListEffects {
  init$ = createEffect(() => {
    return this.store
      .select(getUsersListCriteriaState)
      .pipe(map((usersListCriteria) => loadUsers(usersListCriteria)));
  });

  resetUsersList$ = createEffect(() => {
    return this.actions$.pipe(
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
    return this.actions$.pipe(
      ofType(loadUsers),
      filter(
        (usersListCriteria: UsersListCriteriaState) =>
          usersListCriteria.username !== '',
      ),
      switchMap((usersListCriteria: UsersListCriteriaState) => {
        return this.apiService
          .findByUsername(usersListCriteria.username, usersListCriteria.page)
          .pipe(
            delay(500),
            switchMap((res: UsersResponse) => {
              return zip(
                of(res),
                forkJoin([
                  ...res.items.map((item) =>
                    this.apiService.getUserDescription(item.login),
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
              });
            }),
            takeUntil(this.actions$.pipe(ofType(usernameChanges), skip(1))),
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

  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
    private readonly apiService: UserApiService,
  ) {}
}
