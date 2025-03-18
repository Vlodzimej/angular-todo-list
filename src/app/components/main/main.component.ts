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
import { MinTaskItemsNumberToShow, Resolutions } from '@constants';

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
export class MainComponent implements OnInit {
  @ViewChild(TaskDetailsComponent) taskDetailsPopup?: TaskDetailsComponent;
  @ViewChild(TaskListComponent, { read: ElementRef }) taskListElement?: ElementRef;

  resolutions = Resolutions;

  taskList$ = new Subject<ITaskItem[]>();
  taskList: ITaskItem[] = [];

  /** Статусы со счетчиками задач для отображения информации */
  taskStatusItems: ITaskStatusItem[] = TaskStatuses;

  /** Флаг видимости кнопки «Показать ещё» */
  isMoreButtonVisible: boolean = false;

  /** Минимальное кол-во отображаемых задач для видимости из шаблона */
  minItemsNumberToShow = MinTaskItemsNumberToShow;

  /** Текущее кол-во отображаемых элементов */
  currentItemsNumberToShow = MinTaskItemsNumberToShow;

  constructor(
    private taskService: TaskService,
    private alertService: AlertService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    // Подписываемся на событие изменения списка залач, производим сортировку и обновления счетчиков задач по статусам
    this.taskList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((taskItems) => {
        this.taskList = this.sortTaskItems(taskItems);
        this.refreshTaskStatusesInfo(taskItems);
      });

    // Получение списка задач 
    this.taskService
      .fetchTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.taskList$.next(data);
      });
  }

  /**
   * Обновление счетчиков задач по статусам
   * @param taskList 
   */
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

  /**
   * Обработчик кнопки «Показать ещё»
   */
  handleMoreButtonClick() {
    this.currentItemsNumberToShow =
      this.currentItemsNumberToShow == MinTaskItemsNumberToShow
        ? this.taskList.length
        : MinTaskItemsNumberToShow;
    if (this.currentItemsNumberToShow == MinTaskItemsNumberToShow) {
      this.scrollToTaskList();  
    }
  }

  /**
   * Обработчик добавления новой задачи
   * @param newTaskItem - созданная задача
   */
  handleAddTaskEvent(newTaskItem: ITaskItem) {
    this.taskList$.next([newTaskItem, ...this.taskList]);
  }

  /**
   * Обработчик для отображения карточки задачи
   * @param index - индек задачи
   */
  handleShowTaskDetails(index: number) {
    this.taskDetailsPopup?.open(this.taskList[index]);
  }

  /**
   * Обработчик обновления задачи
   * @param taskItem - изменённая задача
   */
  handleUpdateTaskItem(taskItem: ITaskItem) {
    this.updateTask(taskItem);
  }

  /**
   * Обработчик удаления задачи
   * @param id - идентификатор задачи
   */
  handleRemoveTaskItemById(id: number) {
    this.removeTaskItemById(id);
  }

  /**
   * Удаление задачи
   * @param id  - идентификатор задачи
   */
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

  /**
   * Обновление задачи
   * @param changedTaskItem - изменённая задача
   * @returns 
   */
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

  /**
   * Сортировка задач
   * @param taskItems - неотсортированный список задач
   * @returns 
   */
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

  /**
   * Прокрутка до начала таблицы списка задач
   */
  private scrollToTaskList() {
    if (this.taskListElement && this.taskListElement.nativeElement) {
      this.taskListElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
