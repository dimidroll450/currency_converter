import { Component, OnInit, inject } from '@angular/core';

import { GetCurrencyService } from './services/get-currency.service';
import { BannedCurrenciesService } from './services/banned-currencies.service';
import { CurrList, Constants } from './utils/constants';
import { MainHeaderComponent } from './main-header/main-header.component';
import { FormComponent } from './form/form.component';
import { CurListComponent } from './cur-list/cur-list.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [MainHeaderComponent, FormComponent, CurListComponent]
})
export class AppComponent implements OnInit {
  title = 'Конвертер валют';
  curList: CurrList = [];

  cur = inject(GetCurrencyService);
  curBanlist = inject(BannedCurrenciesService);
  priorityList = Constants.priorityCurrs;

  ngOnInit(): void {

    this.getCurrency();
    setInterval(() => this.getCurrency(), 100000);
  }

  getCurrency(): void {
    this.cur.getCurrency().subscribe({ next: (data: CurrList) => {
      this.curList = data
        .filter(
          ( item => !this.curBanlist.isCurrencyBanned(item.cc) )
        )
        .sort((a, b) => {
          const indexA = this.priorityList.indexOf(a.cc);
          const indexB = this.priorityList.indexOf(b.cc);

          if (indexA !== -1 && indexB === -1) return -1;
          if (indexA === -1 && indexB !== -1) return 1;
          if (indexA !== -1 && indexB !== -1) return indexA - indexB;

          return(a.cc.localeCompare(b.cc));
        });
      console.debug(this.curList);
      // localStorage.setItem('curObj', this.curList);
    }});
  }
}
