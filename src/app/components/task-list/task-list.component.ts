import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ITableCell, ITableModel, ITaskItem } from '@models';
import { TableComponent } from '../../shared/components/table/table.component';
import { TableCellType } from '@enums';
import { TodoTableHeaderRow } from '@data';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [TableComponent],
})
export class TaskListComponent implements OnInit, DoCheck {
  @Input() taskList: ITaskItem[] = [];
  tableData: ITableModel = { rows: [] };

  constructor() {}

  ngDoCheck(): void {
    this.tableData.rows = this.generateTableRows(this.taskList);
  }

  ngOnInit() {}

  generateTableRows(tasks: ITaskItem[]): ITableCell[][] {
    const dataRows: ITableCell[][] = tasks.map((item) => {
      {
        return [
          {
            value: item.name,
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

    return [TodoTableHeaderRow, ...dataRows]
  }
}
