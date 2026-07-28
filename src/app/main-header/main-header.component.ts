import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDividerModule],
})

export class MainHeaderComponent {}
