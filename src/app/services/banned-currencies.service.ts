import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Constants } from '../utils/constants';

 export interface BannedCurrency {
  code: string;
}

interface Banlist {
  bannedCurrencies: BannedCurrency[];
}

@Injectable({
  providedIn: 'root',
})
export class BannedCurrenciesService {
  //private readonly http = inject(HttpClient);

  private bannedCurrencies = signal<BannedCurrency[]>([]);

  constructor(private http: HttpClient) {
    this.loadBanlist();
  }

   get getCurrencyBanlist() {
    return(this.bannedCurrencies.asReadonly());
  }

  private loadBanlist(): void {
    this.http.get<Banlist>(Constants.currBanList).subscribe({
      next: (data) => {
      this.bannedCurrencies.set(data.bannedCurrencies)
      },
      error: (err) => console.error('Error loading banned currencies:', err),
    });

  }

  isCurrencyBanned(code: string): boolean {
    return( this.getCurrencyBanlist().some(curr =>  curr.code === code) );
  };
}
