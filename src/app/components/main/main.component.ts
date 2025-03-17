import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import {
  TaskStatusesInfoComponent,
  TaskCreationComponent,
  TaskListComponent,
  TaskBoardComponent
} from '@components';
import { TaskStatuses } from '@data';
import { GetStatusPriority, TaskStatus } from '@enums';
import { ITaskItem, ITaskStatusItem } from '@models';
import { TaskService } from '@services';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'todo-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [
    CommonModule,
    TaskStatusesInfoComponent,
    TaskCreationComponent,
    TaskListComponent,
    TaskDetailsComponent,
    TaskBoardComponent
  ],
})
export class MainComponent implements OnInit {
  @ViewChild(TaskDetailsComponent) taskDetailsPopup!: TaskDetailsComponent;

  taskList$ = new Subject<ITaskItem[]>();
  taskList: ITaskItem[] = [];
  taskStatusItems: ITaskStatusItem[] = [];

  taskItem!: ITaskItem;

  isMoreButtonVisible: boolean = false;
  minItemsNumberToShow = 5;
  currentItemsNumberToShow = 5;

  constructor(
    private taskService: TaskService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.taskList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((taskItems) => {
        this.taskList = this.sortTaskItems(taskItems);
        this.refreshTaskStatusesInfo(taskItems);
      });

    this.taskService
      .fetchTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.taskList$.next(data);
        this.refreshTaskStatusesInfo(this.taskList);
      });
  }

  handleAddTaskEvent(newTaskItem: ITaskItem) {
    this.taskList$.next([newTaskItem, ...this.taskList]);
  }

  handleShowTaskDetails(index: number) {
    this.taskDetailsPopup.open(this.taskList[index]);
  }

  moreButtonClick() {
    this.currentItemsNumberToShow =
      this.currentItemsNumberToShow == this.minItemsNumberToShow
        ? this.taskList.length
        : this.minItemsNumberToShow;
  }

  refreshTaskStatusesInfo(taskList: ITaskItem[]) {
    this.taskStatusItems = TaskStatuses.map((status) => ({
      ...status,
      count: 0,
    }));

    taskList.forEach((taskItem) => {
      let indexToIncrement;
      switch (taskItem.status) {
        case TaskStatus.CLOSED:
          indexToIncrement = 0;
          break;
        case TaskStatus.IN_PROGRESS:
          indexToIncrement = 1;
          break;
        case TaskStatus.OPENED:
          indexToIncrement = 2;
          break;
        default:
          indexToIncrement = -1;
      }

      if (indexToIncrement !== -1) {
        this.taskStatusItems[indexToIncrement].count++;
      }
    });
  }

  handleUpdateTaskItem(changedTaskItem: ITaskItem) {
    console.log(changedTaskItem);
    const indexToUpdate = this.taskList.findIndex(
      (taskItem) => taskItem.id === changedTaskItem.id
    );
    if (indexToUpdate != -1) {
      const newTaskList = this.removeTaskItem(this.taskList, indexToUpdate);
      newTaskList.splice(indexToUpdate, 0, changedTaskItem);
      this.taskList$.next(newTaskList);
    }
  }

  handleRemoveTaskItemById(id: number) {
    const indexToRemove = this.taskList.findIndex(
      (taskItem) => taskItem.id === id
    );
    if (indexToRemove != -1) {
      this.taskList$.next(this.removeTaskItem(this.taskList, indexToRemove));
    }
  }

  private removeTaskItem(
    taskList: ITaskItem[],
    indexToRemove: number
  ): ITaskItem[] {
    return taskList.reduce((acc: ITaskItem[], item, index) => {
      if (index !== indexToRemove) {
        acc.push(item);
      }
      return acc;
    }, []);
  }

  private sortTaskItems(taskItems: ITaskItem[]): ITaskItem[] {
    return taskItems.sort((a, b) => {
      const statusPriorityA = GetStatusPriority(a.status);
      const statusPriorityB = GetStatusPriority(b.status);

      if (statusPriorityA !== statusPriorityB) {
        return statusPriorityA - statusPriorityB;
      }

      return b.id - a.id;
    });
  }
}
