import { Injectable } from '@angular/core';
import { TaskStatus } from '@enums';
import { ITaskItem } from '@models';
import { BehaviorSubject, delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private data: ITaskItem[] = [
    {
      id: 0,
      value: 'Task 1',
      status: TaskStatus.OPENED,
    },
    {
      id: 1,
      value: 'Task 2',
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: 2,
      value: 'Task 3',
      status: TaskStatus.CLOSED,
    },
  ];

  maxTaskValueLength = 1000;

  fetchTasks(): Observable<ITaskItem[]> {
    return new BehaviorSubject(this.data).pipe(delay(1000));
  }

  addTask(value?: string): Observable<ITaskItem | null> {
    const trimmedValue = (value ?? '').trim();
    if (trimmedValue.length == 0 || trimmedValue.length > this.maxTaskValueLength) {
      return new BehaviorSubject(null);
    }
    const newTaskItem: ITaskItem = {
      id: 0,
      value: trimmedValue,
      status: TaskStatus.OPENED,
    };

    // TODO: Обращение к БД (напрямую, либо через REST API)
    this.data = [newTaskItem, ...this.data]

    return new BehaviorSubject(newTaskItem);
  }

  updateTask(taskItem: ITaskItem): Observable<ITaskItem | null> {
    // TODO: Обращение к БД (напрямую, либо через REST API)
    const index = this.data.findIndex(item => item.id == taskItem.id);
    if (index != null) {
      this.data[index] = taskItem;
    }

    return new BehaviorSubject(taskItem);
  }
}
