import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetCurrencyService {

  constructor(public http: HttpClient) { }

  getCurrency() {
    return this.http.get("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json");
  }
}
