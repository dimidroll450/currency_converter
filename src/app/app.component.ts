import { Component, OnInit } from '@angular/core';
import { GetCurrencyService } from './services/get-currency.service';
import { CurrList } from './utils/constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'Конвертер валют';
  curList: CurrList = [];

  constructor(private cur: GetCurrencyService) {}

  ngOnInit(): void {
    this.getCurrency();
    setInterval(() => this.getCurrency(), 100000);
  }

  getCurrency(): void {
    this.cur.getCurrency().subscribe({ next: (data: CurrList) => {
      this.curList = data;
      // localStorage.setItem('curObj', this.curList);
    }});
  }
}
