import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants, CurrList } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class GetCurrencyService {

  constructor(public http: HttpClient) { }

  getCurrency() {
    return this.http.get<CurrList>(Constants.nbuCurrList);
  }
}
