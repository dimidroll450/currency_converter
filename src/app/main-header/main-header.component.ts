import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
    imports: [ReactiveFormsModule]
})
export class MainHeaderComponent {
  message = '';

  onClickMe(name: string) {
    if (name) {
    this.message = `Натисни на мене, ${name}`;
    }
  }
}
