import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {MyHeaderComponent} from './header.component';


let comp: MyHeaderComponent;
let fixture: ComponentFixture<MyHeaderComponent>;
let de: DebugElement;
let el: HTMLElement;

describe('MyHeaderComponent', () => {
  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyHeaderComponent]
    })
    .compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(MyHeaderComponent);
    comp = fixture.componentInstance; // MyHeaderComponent test instance
    fixture.detectChanges(); // trigger initial data binding
  });


  it('should display title', () => {
    const expectedTitle = 'kouMatsumoto.github.io';
    const el = fixture.debugElement.query(By.css('h1'));
    expect(el.nativeElement.textContent).toEqual(expectedTitle);
  });
});