import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.template.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  environments = [
    {
      subject: 'Ubuntu',
      text: `I use this to development fundamentally.
        This is my <a href="https://github.com/kouMatsumoto/ubuntu-setup-guide">set-up guide</a>.
      `
    },
    {
      subject: 'Mac',
      text: `I use this to check behavior of applications in MacOS environment.
        This is my <a href="https://github.com/kouMatsumoto/macos-setup-guide">set-up guide</a>.
      `
    },
    {
      subject: 'Windows',
      text: `I use this to check behavior of applications in Windows environment.
        This is my <a href="https://github.com/kouMatsumoto/windows-setup-guide">set-up guide</a>.
      `
    },
  ];
}