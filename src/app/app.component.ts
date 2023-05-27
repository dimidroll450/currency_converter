import { Component, OnInit } from '@angular/core';
import { GetCurrencyService } from './services/get-currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Конвертер валют';
  curList: any = [];

  constructor(private cur: GetCurrencyService) {}

  ngOnInit(): void {
    this.getCurrency();
    setInterval(() => this.getCurrency(), 100000);
  }

  getCurrency(): void {
    this.cur.getCurrency().subscribe({ next: (data:any) => {
      this.curList = data; console.log(this.curList)
      localStorage.setItem('curObj', this.curList);
    }});
  }
}
