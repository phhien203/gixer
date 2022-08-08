import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app/app.component';

import { routes } from './app/app.routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
    ),
  ],
}).catch((err) => console.error(err));
