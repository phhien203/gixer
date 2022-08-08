import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TrackByFunction,
} from '@angular/core';
import { UsersListState } from '@gixer/users/data-access';
import { UserModel } from '@gixer/users/util';
import { TuiLoaderModule } from '@taiga-ui/core';

@Component({
  selector: 'gixer-users-users-list',
  standalone: true,
  imports: [CommonModule, TuiLoaderModule],
  template: `
    <tui-loader [showLoader]="!usersListState?.loaded">
      <h3
        *ngIf="usersListState?.total_count ?? 0 > 0"
        class="text-center text-lg my-4"
      >
        {{ usersListState?.total_count }} users found
      </h3>

      <article
        *ngFor="let user of usersListState?.items ?? []; trackBy: trackByUserId"
        class=" flex bg-slate-50 p-4 shadow-xl ring-1 ring-gray-900/5"
      >
        <div class="w-[60px] h-[60px] flex-none">
          <img
            class="w-full h-full rounded-full"
            [src]="user.avatar_url"
            [alt]="'User ' + user.login + ' avatar'"
          />
        </div>

        <div class="ml-4 flex-1">
          <h3 class="text-lg text-blue-500">
            <a href="{{ user.html_url }}" target="_blank" rel="noopener">{{
              user.login
            }}</a>
          </h3>
          <p>{{ user['name'] }}</p>
          <p>{{ user['bio'] }}</p>
          <p>{{ user['location'] }}</p>
        </div>
      </article>
    </tui-loader>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 200px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  @Input() usersListState: UsersListState | null = null;

  trackByUserId: TrackByFunction<UserModel> = (_, { id }) => id;
}
