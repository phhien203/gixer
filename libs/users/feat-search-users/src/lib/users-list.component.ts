import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gixer-users-users-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article *ngFor="let user of users">
      <h3>{{ user.name }}</h3>
      <p>{{ user.stack }}</p>
      <p>{{ user.location }}</p>
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
  users = new Array(5).fill({
    name: 'Hien Pham',
    stack: 'JavaScript, TypeScript',
    location: 'Vietnam',
  });
}
