import { CommonModule } from '@angular/common';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { TableCellType } from '@enums';
import { ITableModel } from 'app/models/tabel-model';
import { TableCellStateComponent } from "./table-cell-state/table-cell-state.component";

@Component({
  selector: 'todo-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule, TableCellStateComponent]
})
export class TableComponent implements OnInit, DoCheck {

  tableCellType = TableCellType

  @Input({required: true}) data!: ITableModel

  constructor() { }

  ngDoCheck(): void {
    console.log("CHECK DATA", this.data.rows)
    
  }

  ngOnInit() {

  }

}
