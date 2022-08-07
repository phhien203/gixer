import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'gixer-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="font-mono">
      <header class="px-xl py-md bg-primary-light text-xl font-bold shadow-md">
        Gixer
      </header>

      <main
        class="max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto py-xl px-md md:px-xl"
      >
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'gixer-app';
}
