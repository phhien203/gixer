import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'gixer-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="flex justify-between p-4 bg-slate-100 shadow-md">
      <a routerLink="/" class="no-underline text-xl font-bold uppercase"
        >Gixer</a
      >
    </header>
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
export class HeaderComponent {}
