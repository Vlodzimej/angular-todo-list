import { Injectable } from '@angular/core';
import { TaskCategories } from '@data';
import { TaskStatus } from '@enums';
import { ITaskCategory, ITaskItem } from '@models';
import { BehaviorSubject, delay, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  data: ITaskItem[] = [
    {
      name: "Task 1",
      status: TaskStatus.OPENED
    },
    {
      name: "Task 2",
      status: TaskStatus.IN_PROGRESS
    },
    {
      name: "Task 3",
      status: TaskStatus.CLOSED
    }
  ]

  constructor() { }

  fetchTasks(): Observable<ITaskItem[]> {
    return new BehaviorSubject(this.data).pipe(delay(1000))
  }

  getTaskCategories(): ITaskCategory[] {
    return TaskCategories
  }
}
