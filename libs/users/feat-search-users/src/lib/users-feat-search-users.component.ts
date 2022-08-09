import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  featureSelector,
  PageIndexChanges,
  UsernameChanges,
  UsernameChangesDebounced,
} from '@gixer/users/data-access';
import { UserSearchInputComponent, UsersListComponent } from '@gixer/users/ui';
import { DEFAULT_DEBOUNCE_TIME_SEARCH_TEXT } from '@gixer/users/util';
import { Store } from '@ngrx/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  skip,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'gixer-users-search-users',
  standalone: true,
  imports: [CommonModule, UserSearchInputComponent, UsersListComponent],
  providers: [TuiDestroyService],
  template: `
    <gixer-users-search-input
      (searchTextChanges)="onSearchTextChanges($event)"
    ></gixer-users-search-input>

    <ng-container *ngIf="vm$ | async as vm">
      <gixer-users-users-list
        class="mt-4"
        [usersListState]="vm.usersList"
        [currentPageIndex]="vm.usersListCriteria.page"
        (pageIndexChanges)="goToPage($event)"
      ></gixer-users-users-list>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
        max-width: 550px;
        margin: 0 auto;
        --tui-radius-m: 999px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFeatSearchUsersComponent implements OnInit {
  readonly #store = inject(Store);
  readonly #destroy$ = inject(TuiDestroyService);

  readonly vm$ = this.#store.select(featureSelector);
  readonly #searchTerm$ = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this.setupDataStreams();
  }

  onSearchTextChanges(text: string): void {
    this.#searchTerm$.next(text);
  }

  goToPage(page: number): void {
    this.#store.dispatch(PageIndexChanges({ page }));
  }

  private setupDataStreams(): void {
    this.#searchTerm$
      .asObservable()
      .pipe(
        skip(1),
        tap((username) => {
          this.#store.dispatch(UsernameChanges({ username }));
        }),
        debounceTime(DEFAULT_DEBOUNCE_TIME_SEARCH_TEXT),
        distinctUntilChanged(),
        tap((username) => {
          this.#store.dispatch(UsernameChangesDebounced({ username }));
        }),
        takeUntil(this.#destroy$),
      )
      .subscribe();
  }
}
