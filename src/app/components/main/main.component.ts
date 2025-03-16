import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import {
  TaskStatusesInfoComponent,
  TaskCreationComponent,
  TaskListComponent,
} from '@components';
import { TaskStatuses } from '@data';
import { TaskStatus } from '@enums';
import { ITaskItem, ITaskStatusItem } from '@models';
import { TaskService } from '@services';
import { TaskDetailsComponent } from '../task-details/task-details.component';

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
  ],
})
export class MainComponent implements OnInit {
  @ViewChild(TaskDetailsComponent) taskDetailsPopup!: TaskDetailsComponent;

  taskList: ITaskItem[] = [];
  taskStatusItems: ITaskStatusItem[] = [];

  taskItem!: ITaskItem;

  isMoreButtonVisible: boolean = false;
  minItemsNumberToShow = 5;
  currentItemsNumberToShow = 5;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.fetchTasks().subscribe((data) => {
      this.taskList = data;
      this.refreshTaskStatusesInfo(this.taskList);
    });
  }

  handleAddTaskEvent(newTaskItem: ITaskItem) {
    this.taskList = [newTaskItem, ...this.taskList];
    this.refreshTaskStatusesInfo(this.taskList);
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

  updateTaskItem(changedTaskItem: ITaskItem) {
    console.log(changedTaskItem)
    const indexToUpdate = this.taskList.findIndex(taskItem => taskItem.id === changedTaskItem.id);
    if (indexToUpdate != -1) {
      const newTaskList = this.taskList.reduce((acc: ITaskItem[], item, index) => {
        if (index !== indexToUpdate) {
          acc.push(item);
        }
        return acc;
      }, []);

      newTaskList.splice(indexToUpdate, 0, changedTaskItem);
      this.taskList = newTaskList;
      this.refreshTaskStatusesInfo(newTaskList);
    }
  }
}
