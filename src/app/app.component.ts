import { Component, OnInit, inject } from '@angular/core';
import { GetCurrencyService } from './services/get-currency.service';
import { BannedCurrenciesService } from './services/banned-currencies.service';
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

  cur = inject(GetCurrencyService);
  curBanlist = inject(BannedCurrenciesService);

  ngOnInit(): void {

    this.getCurrency();
    setInterval(() => this.getCurrency(), 100000);
  }

  getCurrency(): void {
    this.cur.getCurrency().subscribe({ next: (data: CurrList) => {
      this.curList = data.filter(
        ( item => !this.curBanlist.isCurrencyBanned(item.cc) )
      );
      // localStorage.setItem('curObj', this.curList);
    }});
  }
}
