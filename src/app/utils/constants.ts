import { environment } from '../../environments/environment';

export interface Currency {
  readonly r030: number;
  readonly txt: string;
  readonly rate: number;
  readonly cc: string;
  readonly exchangedate: string;
}

export type CurrList = readonly Currency[];

export class Constants {
  public static readonly nbuBaseUrl = environment.url;
  public static readonly nbuCurrList = `${this.nbuBaseUrl}/NBUStatService/v1/statdirectory/exchange?json`;
  public static readonly currBanList = "/assets/config/banned-currencies.json";

  public static readonly priorityCurrs: readonly string[] = ['USD', 'EUR', 'PLN', 'GBP', 'CZK', 'CHF', 'CAD'];
}
