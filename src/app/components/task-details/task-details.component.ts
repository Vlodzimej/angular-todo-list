import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TaskStatus } from '@enums';
import { ITaskItem, TStatusButton } from '@models';
import { TaskService } from '@services';
import { PopupComponent } from '@shared';

@Component({
  selector: 'task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  imports: [CommonModule, PopupComponent, ReactiveFormsModule],
})
export class TaskDetailsComponent {
  @ViewChild(PopupComponent) popup!: PopupComponent;

  @Output() updateTaskItemOutput = new EventEmitter<ITaskItem>();

  taskItem!: ITaskItem;
  taskValueInput = new FormControl('');
  currentStatus!: TaskStatus;

  statusButtons: TStatusButton[] = [
    {
      title: 'Отложить',
      action: () => {
        this.changeStatus(TaskStatus.OPENED);
      },
    },
    {
      title: 'В работу',
      action: () => {
        this.changeStatus(TaskStatus.IN_PROGRESS);
      },
    },
    {
      title: 'Закрыть',
      action: () => {
        this.changeStatus(TaskStatus.CLOSED);
      },
    },
  ];

  constructor(private taskService: TaskService) {}

  open(taskItem: ITaskItem) {
    this.taskItem = taskItem;
    this.currentStatus = taskItem.status;
    this.taskValueInput.setValue(taskItem.value);
    this.popup.show();
  }

  changeStatus(newStatus: TaskStatus) {
    if (newStatus != this.taskItem.status) {
      this.currentStatus   = newStatus;
      this.updateTask();
    }
  }

  handleSaveButtonClick() {
    if (
      this.taskValueInput.value &&
      this.taskValueInput.value.length > 0 &&
      this.taskValueInput.value != this.taskItem.value
    ) {
      this.updateTask();
    }
  }

  updateTask() {
    const newValue = this.taskValueInput.value ?? '';
    const changedTaskItem = { ...this.taskItem, value: newValue, status: this.currentStatus };

    this.taskService.updateTask(changedTaskItem).subscribe((result) => {
      if (result != null) {
        this.updateTaskItemOutput.emit(changedTaskItem);
        this.popup.dismiss();
      }
    });
  }

  handleRemoveButtonClick() {}
}
