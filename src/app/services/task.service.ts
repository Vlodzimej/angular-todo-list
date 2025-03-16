import { Injectable } from '@angular/core';
import { TaskCategories } from '@data';
import { TaskStatus } from '@enums';
import { ITaskCategory, ITaskItem } from '@models';
import { BehaviorSubject, delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private data: ITaskItem[] = [
    {
      value: 'Task 1',
      status: TaskStatus.OPENED,
    },
    {
      value: 'Task 2',
      status: TaskStatus.IN_PROGRESS,
    },
    {
      value: 'Task 3',
      status: TaskStatus.CLOSED,
    },
  ];

  maxTaskValueLength = 1000;

  constructor() {}

  fetchTasks(): Observable<ITaskItem[]> {
    return new BehaviorSubject(this.data).pipe(delay(1000));
  }

  addTask(value?: string): Observable<ITaskItem | null> {
    const trimmedValue = (value ?? '').trim();
    if (trimmedValue.length == 0 || trimmedValue.length > this.maxTaskValueLength) {
      return new BehaviorSubject(null);
    }
    const newTaskItem: ITaskItem = {
      value: trimmedValue,
      status: TaskStatus.OPENED,
    };
    this.data = [newTaskItem, ...this.data]

    return new BehaviorSubject(newTaskItem);
  }

  getTaskCategories(): ITaskCategory[] {
    return TaskCategories;
  }
}
