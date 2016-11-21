import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-development-contents',
  templateUrl: './development-contents.html',
  styleUrls: [
    './contents.css'
  ]
})
export class MyDevelopmentContents {
  itemsForList = [
    {
      contents: [
        {
          subject: 'kouMatsumoto.github.io',
          text: `My profile for business.
            This is made by Angular2 with Material2.
            <a href="https://github.com/kouMatsumoto/kouMatsumoto.github.io" target="_blank">Source code</a>.
          `
        }
      ]
    }
  ];
}
