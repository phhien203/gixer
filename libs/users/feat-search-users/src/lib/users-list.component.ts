import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gixer-users-users-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      *ngFor="let user of users"
      class="flex px-0 py-md border-t border-t-primary-dark"
    >
      <div class="w-[56px] h-[56px]">Avatar</div>
      <div>
        <h3>{{ user.name }}</h3>
        <p>{{ user.stack }}</p>
        <p>{{ user.location }}</p>
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
  users = new Array(10).fill({
    name: 'Hien Pham',
    stack: 'JavaScript, TypeScript',
    location: 'Vietnam',
  });
}
