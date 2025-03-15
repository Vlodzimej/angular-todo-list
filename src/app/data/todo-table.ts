import { TableCellType } from '@enums';
import { ITableCell } from '@models';

export const TodoTableHeaderRow: ITableCell[] = [
  {
    value: 'Задачи',
    align: 'left',
    type: TableCellType.TEXT,
  },
  {
    value: 'Статус',
    align: 'center',
    type: TableCellType.TEXT,
    size: '102px'
  },
];
