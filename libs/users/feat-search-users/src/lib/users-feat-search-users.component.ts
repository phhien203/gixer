import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { UsersListComponent } from './users-list.component';

@Component({
  selector: 'gixer-users-search-users',
  standalone: true,
  imports: [CommonModule, TuiInputModule, UsersListComponent],
  template: `
    <tui-input>
      Enter Github user name
      <input tuiTextfield type="text" />
    </tui-input>
    <gixer-users-users-list class="mt-lg"></gixer-users-users-list>
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
export class UsersFeatSearchUsersComponent {}
