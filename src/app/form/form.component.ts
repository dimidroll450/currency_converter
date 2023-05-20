import { Component, Input, OnInit } from '@angular/core';
import { GetCurrencyService } from './../services/get-currency.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [GetCurrencyService]
})
export class FormComponent implements OnInit {
  // "r030":348,"txt":"Форинт","rate":0.107719,"cc":"HUF","exchangedate":"16.05.2023"
  curList: any;

  constructor(private cur: GetCurrencyService) {}

  ngOnInit(): void {
    this.cur.getCurrency().subscribe({ next: (data:any) => {this.curList = data; console.log(this.curList)} });
    localStorage.setItem('curObj', this.curList);
  }

  @Input() incomingValue!: number;
}
