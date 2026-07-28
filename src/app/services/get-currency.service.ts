import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants, CurrList } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class GetCurrencyService {
  private readonly http = inject(HttpClient);

  getCurrency(): Observable<CurrList> {
    return this.http.get<CurrList>(Constants.nbuCurrList);
  }
}
