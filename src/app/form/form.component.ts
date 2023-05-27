import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { GetCurrencyService } from './../services/get-currency.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [GetCurrencyService]
})
export class FormComponent implements DoCheck{
  @Input() list: any;
  @Input() incomingValue!: number;
  @Input() curInput!: number;
  @Input() curOutput!: number;

  ngDoCheck(): void {}

  convertValue(): number|undefined {
    if (!this.incomingValue) {
      return;
    }

    let result: number = this.incomingValue;

    return result;
  }
}
