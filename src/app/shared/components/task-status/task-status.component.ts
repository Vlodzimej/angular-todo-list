import { Component, Input, OnInit } from '@angular/core';
import { ITaskStatusItem } from '@models';

@Component({
  selector: 'task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss'],
  imports: []
})
export class TaskCategoryComponent implements OnInit {

  @Input() model!: ITaskStatusItem

  constructor() { }

  ngOnInit() {
  }

}
