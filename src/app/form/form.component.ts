import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { CurrList } from '../utils/constants';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatButtonModule, MatSelectModule, MatInputModule],
})
export class FormComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly list = input.required<CurrList>();

  protected readonly currencyForm = this.formBuilder.group({
    inputValue: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    inputCurrency: '',
    outputValue: [{ value: '', disabled: true }],
    outputCurrency: 'UAH',
  });

  protected convertValue(): void {
    const { inputValue, inputCurrency, outputCurrency } = this.currencyForm.getRawValue();

    if (!inputValue || !inputCurrency || outputCurrency !== 'UAH') {
      return;
    }

    const currency = this.list().find((item) => item.cc === inputCurrency);
    if (!currency) {
      return;
    }

    const outputValue = Math.abs(Number(inputValue) * currency.rate).toFixed(2);
    this.currencyForm.controls.outputValue.setValue(outputValue);
  }
}
