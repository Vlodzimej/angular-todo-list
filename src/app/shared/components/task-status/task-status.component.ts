import { Component, Input } from '@angular/core';
import { ITaskStatusItem } from '@models';
import { StatusTitlePipe } from 'app/shared/pipes';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss'],
  imports: [StatusTitlePipe]
})
export class TaskCategoryComponent {
  @Input() model!: ITaskStatusItem
}
