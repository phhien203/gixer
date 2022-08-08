import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';

@Component({
  selector: 'gixer-users-search-input',
  standalone: true,
  imports: [FormsModule, TuiInputModule],
  template: `
    <tui-input
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
