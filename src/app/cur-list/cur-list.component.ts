import { Component, Input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { CurrList } from '../utils/constants';
import { CustomTextPipe } from '../pipes/custom-text.pipe';

@Component({
    selector: 'cur-list',
    templateUrl: './cur-list.component.html',
    styleUrls: ['./cur-list.component.scss'],
    imports: [UpperCasePipe, CustomTextPipe]
})
export class CurListComponent {
  @Input() list: CurrList = [];

}
