import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { TuiInputModule } from '@taiga-ui/kit';

@Component({
  selector: 'gixer-users-search-input',
  standalone: true,
  imports: [FormsModule, TuiInputModule, TuiAutoFocusModule],
  template: `
    <tui-input
      tuiAutoFocus
      icon="tuiIconSearch"
      [focusable]="true"
      [ngModel]="searchText"
      (ngModelChange)="searchTextChanges.emit($event)"
    >
      Search by Github Username
      <input tuiTextfield type="text" />
    </tui-input>
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
export class UserSearchInputComponent {
  @Input() searchText = '';

  @Output() searchTextChanges = new EventEmitter<string>();
}
