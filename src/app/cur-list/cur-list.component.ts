import { Component, Input } from '@angular/core';

@Component({
  selector: 'cur-list',
  templateUrl: './cur-list.component.html',
  styleUrls: ['./cur-list.component.scss']
})
export class CurListComponent {
  @Input() list: any = [];

}
