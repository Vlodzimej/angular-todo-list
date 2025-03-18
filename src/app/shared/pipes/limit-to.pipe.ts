import { Pipe, PipeTransform } from '@angular/core';
import { ITableRow } from '@models';

@Pipe({
  name: 'limitTo',
})
export class LimitToPipe implements PipeTransform {
  transform(value: ITableRow[], limit: number): ITableRow[] {
    return value.slice(0, limit);
  }
}
