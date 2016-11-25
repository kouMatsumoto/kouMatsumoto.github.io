import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class MyHeaderComponent {
  title = 'kouMatsumoto.github.io';
  avatarSrc = '/images/avatar.png';
}