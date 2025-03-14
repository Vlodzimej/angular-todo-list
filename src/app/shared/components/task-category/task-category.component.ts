import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ITaskCategory } from '@models';

@Component({
  selector: 'task-category',
  templateUrl: './task-category.component.html',
  styleUrls: ['./task-category.component.scss'],
  imports: []
})
export class TaskCategoryComponent implements OnInit {

  @Input() model!: ITaskCategory

  constructor() { }

  ngOnInit() {
  }

}
