import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TaskStatus } from '@enums';
import { ITaskItem, TStatusButton } from '@models';
import { AlertService } from '@services';
import { PopupComponent } from '@shared';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  imports: [CommonModule, PopupComponent, ReactiveFormsModule],
})
export class TaskDetailsComponent {
  @ViewChild(PopupComponent) popup!: PopupComponent;

  @Output() updateTaskItemOutput = new EventEmitter<ITaskItem>();
  @Output() removeTaskItemOutput = new EventEmitter<number>();

  taskItem!: ITaskItem;
  taskValueInput = new FormControl('');
  currentStatus!: TaskStatus;
  statusButtons: TStatusButton[] = [];

  /** Модель списка кнопок изменения статуса задачи */
  private allStatusButtons: TStatusButton[] = [
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

    /** Модель списка кнопок изменения статуса задачи, если задача в статусе CLOSED */
  private statusButtonsForClosedTask: TStatusButton[] = [
    {
      title: 'Переоткрыть',
      action: () => {
        this.changeStatus(TaskStatus.OPENED);
      },
    },
  ];

  constructor(private alertService: AlertService) {}

  /** Отображение и инициализация данных данного компонента */
  open(taskItem: ITaskItem) {
    this.taskItem = taskItem;
    this.currentStatus = taskItem.status;
    this.taskValueInput.setValue(taskItem.value);
    this.statusButtons =
      taskItem.status == TaskStatus.CLOSED
        ? this.statusButtonsForClosedTask
        : this.allStatusButtons;

    this.popup.show();
  }

  /** Обработчик сохранения изменений */
  handleSaveButtonClick() {
    this.changeValue();
  }

  /** Обработчик удаления задачи */
  handleRemoveButtonClick() {
    this.removeItem(this.taskItem.id);
  }

  /** Изменение статуса задачи */
  private changeStatus(newStatus: TaskStatus) {
    if (newStatus != this.taskItem.status) {
      this.currentStatus = newStatus;
      const changedTaskItem = {
        ...this.taskItem,
        status: newStatus,
      };
      this.updateTaskItemOutput.emit(changedTaskItem);
      this.popup.dismiss();
    } else {
      this.alertService.showAlert(
        `Задача уже находится в статусе ${newStatus}`
      );
    }
  }

  /** Изменение текста задачи */
  private changeValue() {
    const newValue = this.taskValueInput.value ?? '';
    if (newValue.length > 0 && newValue != this.taskItem.value) {
      const changedTaskItem = {
        ...this.taskItem,
        value: newValue,
      };
      this.updateTaskItemOutput.emit(changedTaskItem);
      this.popup.dismiss();
    } else {
      this.alertService.showAlert('Нет изменений');
    }
  }

  private removeItem(id: number) {
    this.removeTaskItemOutput.emit(id);
    this.popup.dismiss();
  }
}
