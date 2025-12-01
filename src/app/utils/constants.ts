import { environment } from "src/environments/environment";

export type CurrList = ({
  r030: number,
  txt: string,
  rate: string,
  cc: string,
  exchangedate: number
})[];

export class Constants {
  public static readonly nbuBaseUrl = environment.url;
  public static readonly nbuCurrList = `${this.nbuBaseUrl}/NBUStatService/v1/statdirectory/exchange?json`;
  public static readonly currBanList = "/assets/config/banned-currencies.json";

  public static readonly priorityCurrs = [ "USD", "EUR", "PLN", "GBP", "CZK", "CHF", "CAD" ];
}
