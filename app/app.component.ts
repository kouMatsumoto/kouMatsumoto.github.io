import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <md-toolbar color="primary">
      <span>Application Title</span>
    </md-toolbar>
  `
})
export class AppComponent {
  title = 'Tour of Heroes';
}