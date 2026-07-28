import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private readonly http = inject(HttpClient);
  private readonly bannedCurrenciesState = signal<readonly BannedCurrency[]>([]);

  readonly bannedCurrencies = this.bannedCurrenciesState.asReadonly();

  constructor() {
    this.loadBanlist();
  }

  private loadBanlist(): void {
    this.http.get<Banlist>(Constants.currBanList).subscribe({
      next: ({ bannedCurrencies }) => this.bannedCurrenciesState.set(bannedCurrencies),
      error: (error: unknown) => console.error('Error loading banned currencies:', error),
    });
  }

  isCurrencyBanned(code: string): boolean {
    return this.bannedCurrencies().some((currency) => currency.code === code);
  }
}
