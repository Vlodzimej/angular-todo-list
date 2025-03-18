import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '@enums';

@Pipe({
  name: 'statusTitle',
})
export class StatusTitlePipe implements PipeTransform {
  transform(value: TaskStatus): string {
    switch (value) {
      case TaskStatus.OPENED:
        return 'Открыто';
      case TaskStatus.IN_PROGRESS:
        return 'В работе';
      case TaskStatus.CLOSED:
        return 'Закрыто';
      default:
        return '';
    }
  }
}
