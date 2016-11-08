// Angular require zone.js and Reflect polyfill.
require('zone.js/dist/zone.js');
require('reflect-metadata/Reflect.js');
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';


const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
