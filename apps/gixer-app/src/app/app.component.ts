import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'gixer-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  template: `
    <div class="h-full flex flex-col">
      <gixer-header></gixer-header>

      <main class="flex-1 p-8 overflow-auto">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class AppComponent {}
