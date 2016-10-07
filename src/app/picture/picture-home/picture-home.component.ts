import {Component} from '@angular/core';


@Component({
  selector: 'home-app',
  styles  : [ require('./picture-home.component.css') ],
  template: require('./picture-home.component.html')
})
export class HomeComponent {

  ngOnInit() {
    console.log('hello `HomeComponent` component');
  }
  ngOnDestroy() {
    console.log('byebye `HomeComponent` component');
  }
}

