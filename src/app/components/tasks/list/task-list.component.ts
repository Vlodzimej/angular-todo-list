import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ITableCell, ITableModel, ITableRow, ITaskItem } from '@models';
import { TableCellType } from '@enums';
import { TodoTableHeaderCells } from '@data';
import { TableComponent } from '@shared';
import { GetStatusTitleForTask } from '@helpers';

@Component({
  selector: 'app-task-list',
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
    if (Object.hasOwn(changes, 'taskList')) {
      const taskList = changes['taskList'].currentValue;
      this.tableData.rows = this.generateTableRows(taskList);
    }
  }

  /** Создание данных для таблицы */
  generateTableRows(tasks: ITaskItem[]): ITableRow[] {
    // Первые id занимают ячейки хейдера таблицы
    let lastCellId = TodoTableHeaderCells.length + 1;
    let lastRowId = 0;

    const dataRows: ITableRow[] = tasks.map((item) => {
      {
        const cells: ITableCell[] = [
          {
            id: lastCellId,
            value: item.value,
            align: 'left',
            type: TableCellType.TEXT,
          },
          {
            id: lastCellId + 1,
            value: GetStatusTitleForTask(item.status),
            align: 'center',
            type: TableCellType.STATUS,
          },
        ];

        lastRowId += 1;
        lastCellId += 2;

        return { id: lastRowId, cells };
      }
    });

    return [{ id: 0, cells: TodoTableHeaderCells }, ...dataRows];
  }

  /** Обработчик нажатия по статусу задачи */
  handleClickStatusbutton(index: number) {
    this.showTaskDetails.emit(index);
  }
}
