import {Component} from '@angular/core';

/**
 * right-top sns icon link data types. (used in ngFor)
 */
interface SnsLinkData {
  name: string;
  href: string;
  src: string;
}


@Component({
  moduleId: module.id,
  selector: 'my-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class MyHeaderComponent {
  title = 'kouMatsumoto.github.io';
  avatarSrc = '/images/avatar.png';

  // right-top sns icon links
  snsLinks: SnsLinkData[] = [
    {
      name: 'twitter',
      href: 'https://twitter.com/kou_matsumot0',
      src: '/images/twitter.png'
    },
    {
      name: 'facebook',
      href: 'https://www.facebook.com/matsumoto.kou',
      src: '/images/facebook.png'
    },
    {
      name: 'github',
      href: 'https://github.com/kouMatsumoto',
      src: '/images/github.png'
    }
  ];
}