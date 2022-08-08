import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  User,
  UserApiService,
  Users,
  UsersResponse,
} from '@gixer/users/data-access';
import { TuiInputModule, TuiPaginationModule } from '@taiga-ui/kit';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  tap,
  zip,
} from 'rxjs';
import { UsersListComponent } from './users-list.component';

@Component({
  selector: 'gixer-users-search-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiPaginationModule,
    UsersListComponent,
  ],
  template: `
    <tui-input [formControl]="searchFormControl">
      Enter Github Username
      <input tuiTextfield type="text" />
    </tui-input>

    <ng-container *ngIf="usersResponse$ | async as response">
      <h3
        *ngIf="response.total_count > 0"
        class="text-center text-lg mt-4 mb-4"
      >
        {{ response.total_count }} users
      </h3>

      <tui-pagination
        *ngIf="response.total_count > 0"
        class="pb-4 pt-4"
        [sidePadding]="3"
        [length]="getTotalPage(response.total_count)"
        [index]="(page$ | async) ?? 0"
        (indexChange)="goToPage($event)"
      ></tui-pagination>

      <gixer-users-users-list
        class="mt-lg"
        [users]="response.items"
      ></gixer-users-users-list>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
        max-width: 550px;
        margin: 0 auto;
        --tui-radius-m: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFeatSearchUsersComponent implements OnInit {
  #userApiService = inject(UserApiService);

  page$ = new BehaviorSubject<number>(0);
  usersResponse$!: Observable<UsersResponse>;

  searchFormControl = new FormControl('', { nonNullable: true });

  getTotalPage(totalCount: number): number {
    return Math.floor(totalCount / 10) + (totalCount % 10 > 0 ? 1 : 0);
  }

  ngOnInit(): void {
    this.usersResponse$ = combineLatest([
      this.searchFormControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
      ),
      this.page$,
    ]).pipe(
      switchMap(([username, page]) => {
        return this.#userApiService.findByUsername(username, page + 1).pipe(
          switchMap((res: UsersResponse) => {
            return zip(
              of(res),
              forkJoin([
                ...res.items.map((item) =>
                  this.#userApiService.getUserDescription(item.login),
                ),
              ]),
            );
          }),
          map(([res, users]: [UsersResponse, Users]) => {
            return {
              total_count: res.total_count,
              items: res.items.map((item: User, idx: number) => {
                return {
                  ...item,
                  ...users[idx],
                };
              }),
            };
          }),
          tap(console.log),
          catchError((err: unknown) => {
            console.error(err);
            return EMPTY;
          }),
        );
      }),
    );
  }

  goToPage(page: number): void {
    this.page$.next(page);
  }
}
