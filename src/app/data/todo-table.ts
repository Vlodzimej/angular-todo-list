import { TableCellType } from '@enums';
import { ITableCell } from '@models';

export const TodoTableHeaderCells: ITableCell[] = [
  {
    id: 0,
    value: 'Задачи',
    align: 'left',
    type: TableCellType.TEXT,
  },
  {
    id: 1,
    value: 'Статус',
    align: 'center',
    type: TableCellType.TEXT,
    size: '102px'
  },
];
