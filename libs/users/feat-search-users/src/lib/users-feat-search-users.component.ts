import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserApiService, UsersResponse } from '@gixer/users/data-access';
import { TuiInputModule, TuiPaginationModule } from '@taiga-ui/kit';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  Observable,
  switchMap,
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
      Enter Github user name
      <input tuiTextfield type="text" />
    </tui-input>
    <ng-container *ngIf="usersResponse$ | async as response">
      <gixer-users-users-list
        class="mt-lg"
        [users]="response.items"
      ></gixer-users-users-list>
      <tui-pagination
        [length]="response.total_count"
        [index]="(page$ | async) ?? 0"
        (indexChange)="goToPage($event)"
      ></tui-pagination>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
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

  ngOnInit(): void {
    this.usersResponse$ = combineLatest([
      this.searchFormControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
      ),
      this.page$,
    ]).pipe(
      switchMap(([username, page]) =>
        this.#userApiService.findByUsername(username, page + 1).pipe(
          catchError((err: unknown) => {
            console.error(err);
            return EMPTY;
          }),
        ),
      ),
    );
  }

  goToPage(page: number): void {
    this.page$.next(page);
  }
}
