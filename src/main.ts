import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { getTestBed, TestBed } from '@angular/core/testing';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'zone.js/testing';

if (environment.production) {
    enableProdMode();
}




platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
