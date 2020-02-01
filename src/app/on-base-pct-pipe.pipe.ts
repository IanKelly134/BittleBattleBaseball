import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'obpPipe'
})
export class OnBasePctPipePipe extends DecimalPipe {
  transform(val: number, digitsInfo: string = "1.3-3", locale?: string) {
    const str = super.transform(val, digitsInfo, locale);
    return str.replace(/^0+([^\d])/, "$1");
  }
}