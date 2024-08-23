import { Component, Input } from '@angular/core';
import { GetCurrencyService } from './../services/get-currency.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrList } from '../utils/constants';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [GetCurrencyService]
})
export class FormComponent {
  error!: string;

  @Input() list: CurrList = [];

  curForm: FormGroup = this._createForm();

  private _createForm() {
    return new FormGroup({
      "valInput": new FormControl("", Validators.pattern("[0-9]")),
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
