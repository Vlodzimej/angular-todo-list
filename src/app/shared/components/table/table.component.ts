import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableCellType } from '@enums';
import { ITableModel } from '@models';
import { LimitToPipe } from 'app/shared/pipes/limit-to.pipe';

@Component({
  selector: 'todo-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule, LimitToPipe],
})
export class TableComponent {
  @Input({ required: true }) data!: ITableModel;
  @Input({ required: true }) limit!: number;
  @Input() placeholder: string = '';

  @Output() clickStatusButton = new EventEmitter<number>();

  tableCellType = TableCellType;

  handleClickStatusButton(index: number) {
    this.clickStatusButton.emit(index - 1);
  }
}
