import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCategoryComponent } from '@shared';
import { ITaskStatusItem } from '@models';

@Component({
  selector: 'task-statuses-info',
  templateUrl: './task-statuses-info.component.html',
  styleUrls: ['./task-statuses-info.component.scss'],
  imports: [CommonModule, TaskCategoryComponent],
})
export class TaskStatusesInfoComponent {
  @Input({ required: true }) taskStatusItems!: ITaskStatusItem[];
}
