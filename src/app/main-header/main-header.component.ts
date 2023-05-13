import { Component } from '@angular/core';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent {
  message = '';

  onClickMe(name: string) {
    if (name) {
    this.message = `Натисни на мене, ${name}`;
    }
  }
}
