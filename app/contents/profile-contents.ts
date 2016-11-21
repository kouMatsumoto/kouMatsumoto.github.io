import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-profile-contents',
  templateUrl: './profile-contents.html',
  styleUrls: [
    './contents.css'
  ]
})
export class MyProfileContents {
  itemsForList = [
    {
      head: 'OS',
      contents: [
        {
          subject: 'Ubuntu',
          text: `I use this to development fundamentally.
            This is my <a href="https://github.com/kouMatsumoto/ubuntu-setup-guide" target="_blank">set-up guide</a>.
          `
        },
        {
          subject: 'Mac',
          text: `I use this to check behavior of applications in MacOS environment.
            This is my <a href="https://github.com/kouMatsumoto/macos-setup-guide" target="_blank">set-up guide</a>.
          `
        },
        {
          subject: 'Windows',
          text: `I use this to check behavior of applications in Windows environment.
            This is my <a href="https://github.com/kouMatsumoto/windows-setup-guide" target="_blank">set-up guide</a>.
          `
        },
      ]
    },
    {
      head: 'Editor and IDE',
      contents: [
        {
          subject: 'WebStorm',
          text: `Fundamentally IDE of web development.
            I use this in Node.js and TypeScript project.
          `
        },
        {
          subject: 'Visual Studio Code',
          text: `With small codes, sometimes I use.`
        }
      ]
    },
    {
      head: 'Devices',
      contents: [
        {
          subject: 'Ergodox EZ',
          text: `The ergonomic keyboard which we can flexibly customize whatever, keymap, keyswitches, keycaps, etc...
            See <a href="https://ergodox-ez.com/" target="_blank">https://ergodox-ez.com/</a>
          `
        },
        {
          subject: 'Logicool G700s',
          text: `This mouse can store customized keymap into on-board memory. (we can use on Ubuntu.)
            See <a href="http://gaming.logitech.com/en-us/product/g700s-rechargeable-wireless-gaming-mouse" target="_blank">http://gaming.logitech.com/en-us/product/g700s-rechargeable-wireless-gaming-mouse</a>
          `
        }
      ]
    }
  ];
}

