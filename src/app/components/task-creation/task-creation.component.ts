import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ITaskItem } from '@models';
import { AlertService, TaskService } from '@services';

@Component({
  selector: 'task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class TaskCreationComponent {
  @Output() addTaskEvent = new EventEmitter<ITaskItem>();

  taskValueInput = new FormControl('');

  constructor(
    private taskService: TaskService,
    private alertService: AlertService,
    private destroyRef: DestroyRef
  ) {}

  handleSubmit(e: Event) {
    e.preventDefault();
    this.addTask();
  }

  handleResetInput(e: Event) {
    e.preventDefault();
    this.taskValueInput.setValue('');
  }

  private addTask() {
    const text = (this.taskValueInput.value ?? '').trim();
    if (text.length == 0) {
      this.alertService.showAlert('Поле не заполнено');
      return;
    }
    this.taskService
      .addTask(text)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.addTaskEvent.emit(result);
          this.taskValueInput.setValue('');
        },
        error: (error) => {
          console.error(error);
          this.alertService.showAlert('Ошибка при добавлении записи');
        },
      });
  }
}
