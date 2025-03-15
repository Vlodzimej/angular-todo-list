import { TableCellType } from "@enums"

/**
 * Данные таблицы 
 */
export interface ITableModel {
    rows: ITableCell[][]
}

/**
 * Ячейка таблицы
 */
export interface ITableCell {
    value: string
    align: 'left' | 'right' | 'center'
    type: TableCellType
    size?: string
}