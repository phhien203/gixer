import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'gixer-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="">
      <header class="p-4 bg-slate-100 text-xl font-bold shadow-md uppercase">
        Gixer
      </header>

      <main class="p-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'gixer-app';
}
