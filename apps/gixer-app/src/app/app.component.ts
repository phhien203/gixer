import { Component } from '@angular/core';

@Component({
  selector: 'gixer-root',
  standalone: true,
  template: `
    <div class="font-mono">
      <header class="px-xl py-md bg-primary-light text-xl font-bold shadow-md">
        Gixer
      </header>

      <main
        class="max-w-xl md:max-w-2xl lg:max-w-6xl mx-auto py-xl px-md md:px-xl grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3"
      >
        <p>App component works</p>
      </main>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'gixer-app';
}
