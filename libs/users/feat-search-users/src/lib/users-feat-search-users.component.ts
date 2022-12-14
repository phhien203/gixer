import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  featureSelector,
  PageIndexChanges,
  UsernameChanges,
  UsernameChangesDebounced,
  UserNameQueryChanges,
} from '@gixer/users/data-access';
import { UserSearchInputComponent, UsersListComponent } from '@gixer/users/ui';
import { DEFAULT_DEBOUNCE_TIME_SEARCH_TEXT } from '@gixer/users/util';
import { Store } from '@ngrx/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
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
    <ng-container *ngIf="vm$ | async as vm">
      <gixer-users-search-input
        [searchText]="vm.usersListCriteria.username"
        (searchTextChanges)="onSearchTextChanges($event)"
      ></gixer-users-search-input>

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
        max-width: 600px;
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
  readonly #route = inject(ActivatedRoute);

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

    this.#route.queryParamMap
      .pipe(
        map((query) => query.get('q') as string),
        filter<string>((v) => !!v),
        tap((username: string) => {
          this.#store.dispatch(UserNameQueryChanges({ username }));
        }),
        takeUntil(this.#destroy$),
      )
      .subscribe();
  }
}
