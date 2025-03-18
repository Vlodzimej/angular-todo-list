import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  TaskStatusesInfoComponent,
  TaskCreationComponent,
  TaskListComponent,
  TaskBoardComponent,
  TaskSmallListComponent,
  TaskDetailsComponent
} from '@components';
import { TaskStatuses } from '@data';
import { GetStatusPriority, TaskStatus } from '@enums';
import { ITaskItem, ITaskStatusItem } from '@models';
import { AlertService, TaskService } from '@services';
import { Subject } from 'rxjs';
import { ShowOnDeviceDirective } from '@shared';
import { Resolutions } from '@constants';

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
    TaskBoardComponent,
    TaskSmallListComponent,
    ShowOnDeviceDirective,
  ],
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild(TaskDetailsComponent) taskDetailsPopup?: TaskDetailsComponent;
  @ViewChild(TaskListComponent, { read: ElementRef }) taskListElement?: ElementRef;

  resolutions = Resolutions;

  taskList$ = new Subject<ITaskItem[]>();
  taskList: ITaskItem[] = [];
  taskStatusItems: ITaskStatusItem[] = TaskStatuses;

  taskItem!: ITaskItem;

  isMoreButtonVisible: boolean = false;
  minItemsNumberToShow = 5;
  currentItemsNumberToShow = 5;

  constructor(
    private taskService: TaskService,
    private alertService: AlertService,
    private destroyRef: DestroyRef
  ) {}

  ngAfterViewInit(): void {
    console.log(this.taskListElement); // Проверьте, что элемент существует
  }

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

      if (indexToIncrement != -1) {
        this.taskStatusItems[indexToIncrement].count++;
      }
    });
  }

  handleMoreButtonClick() {
    this.currentItemsNumberToShow =
      this.currentItemsNumberToShow == this.minItemsNumberToShow
        ? this.taskList.length
        : this.minItemsNumberToShow;
    if (this.currentItemsNumberToShow == this.minItemsNumberToShow) {
      this.scrollToTaskList();  
    }
  }

  handleAddTaskEvent(newTaskItem: ITaskItem) {
    this.taskList$.next([newTaskItem, ...this.taskList]);
  }

  handleShowTaskDetails(index: number) {
    this.taskDetailsPopup?.open(this.taskList[index]);
  }

  handleUpdateTaskItem(taskItem: ITaskItem) {
    this.updateTask(taskItem);
  }

  handleRemoveTaskItemById(id: number) {
    this.removeTaskItemById(id);
  }

  private removeTaskItemById(id: number) {
    this.taskService
      .removeTaskById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (idToRemove) => {
          this.taskList$.next(
            this.taskList.filter((taskItem) => taskItem.id != idToRemove)
          );
        },
        error: (error) => {
          console.error(error);
          this.alertService.showAlert('Ошибка при удалении записи');
        },
      });
  }

  private updateTask(changedTaskItem: ITaskItem) {
    const indexToUpdate = this.taskList.findIndex(
      (taskItem) => taskItem.id === changedTaskItem.id
    );

    if (indexToUpdate == -1) {
      this.alertService.showAlert('Запись не найдена');
      return;
    }

    this.taskService
      .updateTask(changedTaskItem)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (taskItem) => {
          const newTaskList = this.taskList.filter(
            (taskItem) => taskItem.id != changedTaskItem.id
          );
          newTaskList.splice(indexToUpdate, 0, taskItem);
          this.taskList$.next(newTaskList);
        },
        error: (error) => {
          console.error(error);
          this.alertService.showAlert('Ошибка при обновлении записи');
        },
      });
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

  private scrollToTaskList() {
    if (this.taskListElement && this.taskListElement.nativeElement) {
      this.taskListElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
