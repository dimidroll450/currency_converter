import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customText' })
export class CustomTextPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let result: string = value;


    if (args.indexOf('b') !== -1) {
      result = `<b>${result}</b>`
    }

    if (args.indexOf('i') !== -1) {
        result = `<i>${result}</i>`
    }

    return result;
  }

}
