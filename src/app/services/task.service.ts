import { Injectable } from '@angular/core';
import { TaskStatus } from '@enums';
import { ITaskItem } from '@models';
import { Observable, from, throwError } from 'rxjs';
import { delay, tap, catchError, map } from 'rxjs/operators';
import { openDB, IDBPDatabase } from 'idb';
import { DataBaseName, StoreName } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private maxTaskValueLength = 1000;
  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.dbPromise = this.initDB();
  }

  private async initDB(): Promise<IDBPDatabase> {
    return openDB(DataBaseName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(StoreName)) {
          db.createObjectStore(StoreName, { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }

  fetchTasks(): Observable<ITaskItem[]> {
    return from(this.dbPromise.then((db) => db.getAll(StoreName))).pipe(
      map((tasks) =>
        tasks.map((task) => ({
          ...task,
          id: Number(task.id),
        }))
      ),
      catchError((error) => {
        console.error('Error fetching tasks:', error);
        throw new Error('Failed to fetch tasks');
      })
    );
  }

  addTask(value?: string): Observable<ITaskItem> {
    const trimmedValue = (value ?? '').trim();

    if (trimmedValue.length === 0) {
      throw new Error('Task value cannot be empty');
    }

    if (trimmedValue.length > this.maxTaskValueLength) {
      throw new Error(
        `Task value cannot exceed ${this.maxTaskValueLength} characters`
      );
    }

    const newTaskItem: Omit<ITaskItem, 'id'> = {
      value: trimmedValue,
      status: TaskStatus.OPENED,
    };

    return from(
      this.dbPromise.then((db) => db.add(StoreName, newTaskItem))
    ).pipe(
      map((id) => {
        const task: ITaskItem = {
          ...newTaskItem,
          id: Number(id),
        };
        return task;
      }),
      tap((task) => {
        console.log('Task added:', task);
      }),
      catchError((error) => {
        console.error('Error adding task:', error);
        throw new Error('Failed to add task');
      })
    );
  }

  updateTask(taskItem: ITaskItem): Observable<ITaskItem> {
    if (!taskItem) {
      return throwError(() => new Error('Task item is undefined or null'));
    }

    if (!taskItem.id || typeof taskItem.id !== 'number') {
      return throwError(() => new Error('Task ID is missing or invalid'));
    }

    return from(
      this.dbPromise.then((db) => db.put(StoreName, taskItem))
    ).pipe(
      map(() => taskItem),
      catchError((error) => {
        console.error('Error updating task:', error);
        throw new Error('Failed to update task');
      })
    );
  }

  removeTaskById(id: number): Observable<number> {
    return from(
      this.dbPromise.then((db) => db.delete(StoreName, id))
    ).pipe(
      map(() => id),
      catchError((error) => {
        console.error('Error deleting task:', error);
        throw new Error('Failed to delete task');
      })
    );
  }
}
