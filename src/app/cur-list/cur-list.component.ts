import { Component, Input } from '@angular/core';
import { CurrList } from '../utils/constants';

@Component({
  selector: 'cur-list',
  templateUrl: './cur-list.component.html',
  styleUrls: ['./cur-list.component.scss']
})
export class CurListComponent {
  @Input() list: CurrList = [];

}
