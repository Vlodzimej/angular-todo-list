import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ITableCell, ITableModel, ITaskItem } from '@models';
import { TableCellType } from '@enums';
import { TodoTableHeaderRow } from '@data';
import { TableComponent } from '@shared';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [TableComponent],
})
export class TaskListComponent implements OnChanges {
  @Input() taskList: ITaskItem[] = [];
  @Input() itemsCountToShow!: number;

  @Output() showTaskDetails = new EventEmitter<number>();

  tableData: ITableModel = { rows: [] };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('taskList')) {
      const taskList = changes['taskList'].currentValue;
      this.tableData.rows = this.generateTableRows(taskList);
    }
  }

  generateTableRows(tasks: ITaskItem[]): ITableCell[][] {
    const dataRows: ITableCell[][] = tasks.map((item) => {
      {
        return [
          {
            value: item.value,
            align: 'left',
            type: TableCellType.TEXT,
          },
          {
            value: item.status,
            align: 'center',
            type: TableCellType.STATUS,
            size: '102px',
          },
        ];
      }
    });

    return [TodoTableHeaderRow, ...dataRows];
  }

  handleClickStatusbutton(index: number) {
    this.showTaskDetails.emit(index);
  }
}
