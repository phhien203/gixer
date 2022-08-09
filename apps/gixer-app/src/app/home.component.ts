import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'gixer-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="mx-auto">
      <h1 class="text-4xl text-center my-4">Welcome to Gixer app</h1>
      <a
        class="text-2xl inline-block mx-auto text-center underline"
        routerLink="/users"
        >Search Users</a
      >
    </div>
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
export class HomeComponent {}
