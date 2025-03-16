import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TableCellType } from '@enums';
import { ITableModel } from 'app/models/tabel-model';
import { TableCellStateComponent } from "./table-cell-state/table-cell-state.component";
import { LimitToPipe } from 'app/shared/pipes/limit-to.pipe';

@Component({
  selector: 'todo-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule, TableCellStateComponent, LimitToPipe]
})
export class TableComponent implements OnInit {
  @Input({required: true}) data!: ITableModel
  @Input({required: true}) limit!: number

  tableCellType = TableCellType

  constructor() { }

  ngOnInit() {

  }

}
