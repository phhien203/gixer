import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  getUsersListCriteriaPage,
  getUsersListState,
  pageIndexChanges,
  usernameChanges,
  usernameChangesDebounced,
  UsersDataAccessModule,
  UsersListState,
} from '@gixer/users/data-access';
import { Store, StoreFeatureModule } from '@ngrx/store';
import { TuiInputModule, TuiPaginationModule } from '@taiga-ui/kit';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
  tap,
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
    StoreFeatureModule,
    UsersDataAccessModule,
  ],
  template: `
    <tui-input [formControl]="searchFormControl">
      Enter Github Username
      <input tuiTextfield type="text" />
    </tui-input>

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
  store = inject(Store);

  usersListState$: Observable<UsersListState> =
    this.store.select(getUsersListState);
  page$ = this.store.select(getUsersListCriteriaPage);

  searchFormControl = new FormControl('', { nonNullable: true });

  getTotalPage(totalCount: number): number {
    return Math.floor(totalCount / 5) + (totalCount % 5 > 0 ? 1 : 0);
  }

  ngOnInit(): void {
    this.searchFormControl.valueChanges
      .pipe(
        startWith(''),
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

  goToPage(page: number): void {
    this.store.dispatch(pageIndexChanges({ page: page + 1 }));
  }
}
