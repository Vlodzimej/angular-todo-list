import { Injectable } from '@angular/core';
import { TaskStatus } from '@enums';
import { ITaskItem } from '@models';
import { BehaviorSubject, delay, Observable, tap } from 'rxjs';

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
  lastTasksId: number = 0;

  fetchTasks(): Observable<ITaskItem[]> {
    return new BehaviorSubject(this.data).pipe(
      delay(1000),
      tap((taskList) => {
        this.lastTasksId = Math.max(...taskList.map((task) => task.id));
      })
    );
  }

  addTask(value?: string): Observable<ITaskItem | null> {
    const trimmedValue = (value ?? '').trim();
    if (
      trimmedValue.length == 0 ||
      trimmedValue.length > this.maxTaskValueLength
    ) {
      return new BehaviorSubject(null);
    }
    
    this.lastTasksId++;
    const newTaskItem: ITaskItem = {
      id: this.lastTasksId,
      value: trimmedValue,
      status: TaskStatus.OPENED,
    };

    // TODO: Обращение к БД (напрямую, либо через REST API)
    this.data = [newTaskItem, ...this.data];

    return new BehaviorSubject(newTaskItem);
  }

  updateTask(taskItem: ITaskItem): Observable<ITaskItem | null> {
    // TODO: Обращение к БД (напрямую, либо через REST API)
    const index = this.data.findIndex((item) => item.id == taskItem.id);
    if (index != -1) {
      this.data[index] = taskItem;
    }

    return new BehaviorSubject(taskItem);
  }

  removeTaskById(id: number): Observable<number | null> {
    // TODO: Обращение к БД (напрямую, либо через REST API)
    return new BehaviorSubject(id);
  }
}
