import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiInputModule } from '@taiga-ui/kit';

@Component({
  selector: 'gixer-users-search-users',
  standalone: true,
  imports: [CommonModule, TuiInputModule],
  template: `
    <tui-input>
      Enter Github user name
      <input tuiTextfield type="text" />
    </tui-input>
    <p>users-feat-search-users works!</p>
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
