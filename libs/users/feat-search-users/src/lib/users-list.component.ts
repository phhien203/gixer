import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TrackByFunction,
} from '@angular/core';
import { User, Users } from '@gixer/users/data-access';

@Component({
  selector: 'gixer-users-users-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      *ngFor="let user of users; trackBy: trackByUserId"
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
export class UsersListComponent {
  @Input() users: Users = [];

  trackByUserId: TrackByFunction<User> = (_, { id }) => id;
}
