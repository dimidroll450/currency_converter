export interface Currency {
  readonly r030: number;
  readonly txt: string;
  readonly rate: number;
  readonly cc: string;
  readonly exchangedate: string;
}

export type CurrList = readonly Currency[];

export class Constants {
  public static readonly nbuCurrList = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
  public static readonly currBanList = "/assets/config/banned-currencies.json";

  public static readonly priorityCurrs: readonly string[] = ['USD', 'EUR', 'PLN', 'GBP', 'CZK', 'CHF', 'CAD'];
}
