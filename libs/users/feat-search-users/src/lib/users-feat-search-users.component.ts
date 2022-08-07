import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserApiService, Users } from '@gixer/users/data-access';
import { TuiInputModule } from '@taiga-ui/kit';
import {
  debounceTime,
  distinctUntilChanged,
  map,
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
    UsersListComponent,
  ],
  template: `
    <tui-input [formControl]="searchFormControl">
      Enter Github user name
      <input tuiTextfield type="text" />
    </tui-input>
    <gixer-users-users-list
      class="mt-lg"
      [users]="(users$ | async) ?? []"
    ></gixer-users-users-list>
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

  searchFormControl = new FormControl('');

  users$!: Observable<Users>;

  ngOnInit(): void {
    this.users$ = this.searchFormControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((username) =>
        this.#userApiService
          .findByUsername(username ?? '')
          .pipe(map((data) => data.items)),
      ),
    );
  }
}
