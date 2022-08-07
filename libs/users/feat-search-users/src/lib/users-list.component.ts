import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Users } from '@gixer/users/data-access';

@Component({
  selector: 'gixer-users-users-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      *ngFor="let user of users"
      class="flex px-0 py-md border-t border-t-primary-dark"
    >
      <div class="w-[56px] h-[56px]">
        <img
          class="w-full h-full"
          [src]="user.avatar_url"
          [alt]="'User ' + user.login + ' avatar'"
        />
      </div>
      <div>
        <h3 class="text-primary">{{ user.login }}</h3>
        <p>{{ user.html_url }}</p>
        <!-- <p>{{ user.location }}</p> -->
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
}
