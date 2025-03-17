import { TableCellType } from '@enums';

/**
 * Данные таблицы
 */
export interface ITableModel {
  rows: ITableRow[];
}

export interface ITableRow {
  id: number;
  cells: ITableCell[];
}

/**
 * Ячейка таблицы
 */
export interface ITableCell {
  id: number;
  value: string;
  align: 'left' | 'right' | 'center';
  type: TableCellType;
  size?: string;
}
