import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

import { CurrList } from '../utils/constants';
@Component({
  selector: 'app-cur-list',
  templateUrl: './cur-list.component.html',
  styleUrl: './cur-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UpperCasePipe, MatCardModule],
})
export class CurListComponent {
  readonly list = input.required<CurrList>();
}
