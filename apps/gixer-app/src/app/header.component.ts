import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gixer-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="p-4 bg-slate-100 text-xl font-bold shadow-md uppercase">
      Gixer
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
