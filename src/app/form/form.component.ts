import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { GetCurrencyService } from './../services/get-currency.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [GetCurrencyService]
})
export class FormComponent {
  error!: string;

  @Input() list: any;

  curForm: FormGroup = this._createForm();

  constructor() {
  }

  private _createForm() {
    return new FormGroup({
      "valInput": new FormControl("", Validators.pattern("[0-9]")),
      "selectInput": new FormControl("UAH"),
      "valOutput": new FormControl({ value: "", disabled: true }),
      "selectOutput": new FormControl(''),
    });
  }

  changeOutputCur (e: any) {
    this.curForm?.patchValue( { selectOutput: e.target.value });
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

    if (inputCur === 'UAH') {
      console.log(outputCur);
      const [currItem, ...rest] = this.list.filter((item: { cc: string; }) => item.cc === outputCur);

      result = Math.abs(Number(inputVal) * Number(currItem.rate)).toFixed(2);
    }


    this.curForm.patchValue({
      valOutput: result
    });
  }
}
