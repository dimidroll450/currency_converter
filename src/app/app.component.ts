import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, timer } from 'rxjs';

import { GetCurrencyService } from './services/get-currency.service';
import { BannedCurrenciesService } from './services/banned-currencies.service';
import { CurrList, Constants } from './utils/constants';
import { MainHeaderComponent } from './main-header/main-header.component';
import { FormComponent } from './form/form.component';
import { CurListComponent } from './cur-list/cur-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MainHeaderComponent, FormComponent, CurListComponent],
})
export class AppComponent {
  private readonly currencyService = inject(GetCurrencyService);
  private readonly bannedCurrenciesService = inject(BannedCurrenciesService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currencies = signal<CurrList>([]);

  protected readonly currencyList = computed(() =>
    this.currencies()
      .filter((currency) => !this.bannedCurrenciesService.isCurrencyBanned(currency.cc))
      .sort((first, second) => this.compareCurrencies(first.cc, second.cc)),
  );

  constructor() {
    timer(0, 100_000)
      .pipe(
        switchMap(() =>
          this.currencyService.getCurrency().pipe(
            catchError((error: unknown) => {
              console.error('Error loading currencies:', error);
              return of([] as CurrList);
            }),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((currencies) => this.currencies.set(currencies));
  }

  private compareCurrencies(firstCode: string, secondCode: string): number {
    const firstPriority = Constants.priorityCurrs.indexOf(firstCode);
    const secondPriority = Constants.priorityCurrs.indexOf(secondCode);

    if (firstPriority === -1 && secondPriority === -1) {
      return firstCode.localeCompare(secondCode);
    }

    if (firstPriority === -1) return 1;
    if (secondPriority === -1) return -1;

    return firstPriority - secondPriority;
  }
}
