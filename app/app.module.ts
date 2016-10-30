import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';

import {AppComponent} from './app.component';
import {MyHeader} from './header/index';


@NgModule({
  imports: [
    BrowserModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    MyHeader
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
