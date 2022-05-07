import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as $ from 'jquery';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

initExtension();

function initExtension() {
  $(document).ready(() => {
    const appRoot = document.createElement('app-zi-hackathon-ants');
    document.body.appendChild(appRoot);
    return platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .then(() => {
          window.postMessage({}, window.origin);
        })
        .catch((err) => console.error(err));
  });
}
