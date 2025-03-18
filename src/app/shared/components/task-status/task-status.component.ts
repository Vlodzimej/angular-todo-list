import { Component, Input, OnInit } from '@angular/core';
import { ITaskStatusItem } from '@models';
import { StatusTitlePipe } from 'app/shared/pipes';

@Component({
  selector: 'task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss'],
  imports: [StatusTitlePipe]
})
export class TaskCategoryComponent implements OnInit {

  @Input() model!: ITaskStatusItem

  constructor() { }

  ngOnInit() {
  }

}
