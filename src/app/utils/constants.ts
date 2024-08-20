export type CurrList = ({
  r030: number,
  txt: string,
  rate: string,
  cc: string,
  exchangedate: number
})[];

export class Constants {
  public static readonly nbuCurrList = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
}
