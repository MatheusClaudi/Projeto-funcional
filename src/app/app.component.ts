import { Component } from '@angular/core';
import Utils from '../_util/util'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';

  constructor() {
    this.title = Utils.returnTitle();
  }
}
