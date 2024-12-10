import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { GetCurrencyService } from './../services/get-currency.service';
import { CurrList } from '../utils/constants';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [GetCurrencyService],
    imports: [
      ReactiveFormsModule,
      MatButtonModule,
      MatSelectModule,
      MatInputModule
    ]
})
export class FormComponent {
  error!: string;

  @Input() list: CurrList = [];

  curForm: FormGroup = this._createForm();

  private _createForm() {
    return new FormGroup({
      "valInput": new FormControl("", [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      "selectInput": new FormControl(''),
      "valOutput": new FormControl({ value: "", disabled: true }),
      "selectOutput": new FormControl("UAH"),
    });
  }

  changeOutputCur (e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.curForm?.patchValue( { selectOutput: target.value });
  }

  convertValue () {
    this.error = '';
    let result = '';

    const inputVal = this.curForm.get('valInput')?.value;
    const inputCur = this.curForm.get('selectInput')?.value;
    const outputCur = this.curForm.get('selectOutput')?.value;

    if (!outputCur || !inputVal) {
      return;
    }

    if (outputCur === 'UAH') {
      // console.log(outputCur);
      const [currItem, ] = this.list.filter((item: { cc: string; }) => item.cc === inputCur);

      result = Math.abs(Number(inputVal) * Number(currItem.rate)).toFixed(2);
    }


    this.curForm.patchValue({
      valOutput: result
    });
  }
}
