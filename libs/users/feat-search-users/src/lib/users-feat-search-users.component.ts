import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  getUsersListCriteriaPage,
  getUsersListState,
  pageIndexChanges,
  usernameChanges,
  usernameChangesDebounced,
  UsersListState,
} from '@gixer/users/data-access';
import { UserSearchInputComponent, UsersListComponent } from '@gixer/users/ui';
import { Store } from '@ngrx/store';
import { TuiPaginationModule } from '@taiga-ui/kit';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  tap,
} from 'rxjs';

@Component({
  selector: 'gixer-users-search-users',
  standalone: true,
  imports: [
    CommonModule,
    UserSearchInputComponent,
    TuiPaginationModule,
    UsersListComponent,
  ],
  template: `
    <gixer-users-search-input
      (searchTextChanges)="onSearchTextChanges($event)"
    ></gixer-users-search-input>

    <ng-container *ngIf="usersListState$ | async as response">
      <p *ngIf="response.error">{{ response.error }}</p>
      <p>{{ response.loaded }}</p>

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
  usersListState$: Observable<UsersListState> =
    this.store.select(getUsersListState);
  page$ = this.store.select(getUsersListCriteriaPage);

  private searchTerm$ = new BehaviorSubject<string>('');

  constructor(private readonly store: Store) {}

  getTotalPage(totalCount: number): number {
    return Math.floor(totalCount / 5) + (totalCount % 5 > 0 ? 1 : 0);
  }

  ngOnInit(): void {
    this.searchTerm$
      .asObservable()
      .pipe(
        tap((username) => {
          this.store.dispatch(usernameChanges({ username }));
        }),
        debounceTime(1000),
        distinctUntilChanged(),
        tap((username) => {
          this.store.dispatch(usernameChangesDebounced({ username }));
        }),
      )
      .subscribe();
  }

  onSearchTextChanges(text: string): void {
    this.searchTerm$.next(text);
  }

  goToPage(page: number): void {
    this.store.dispatch(pageIndexChanges({ page: page + 1 }));
  }
}
