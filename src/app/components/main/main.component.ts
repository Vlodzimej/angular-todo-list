import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import {
  TaskCategoriesInfoComponent,
  TaskCreationComponent,
  TaskListComponent,
} from '@components';
import { TaskCategories } from '@data';
import { TaskStatus } from '@enums';
import { ITaskCategory, ITaskItem } from '@models';
import { TaskService } from '@services';

@Component({
  selector: 'todo-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [
    CommonModule,
    TaskCategoriesInfoComponent,
    TaskCreationComponent,
    TaskListComponent,
  ],
})
export class MainComponent implements OnInit {
  taskList: ITaskItem[] = [];
  taskCategories: ITaskCategory[] = [];

  isMoreButtonVisible: boolean = false;
  minItemsNumberToShow = 5;
  currentItemsNumberToShow = 5;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.fetchTasks().subscribe((data) => {
      this.taskList = data;
      this.refreshTaskCategories(this.taskList);
    });
  }

  handleAddTaskEvent(newTaskItem: ITaskItem) {
    this.taskList = [newTaskItem, ...this.taskList];
    this.refreshTaskCategories(this.taskList);
  }

  moreButtonClick() {
    this.currentItemsNumberToShow =
      this.currentItemsNumberToShow == this.minItemsNumberToShow
        ? this.taskList.length
        : this.minItemsNumberToShow;
  }

  refreshTaskCategories(taskList: ITaskItem[]) {
    this.taskCategories = TaskCategories.map((category) => ({
      ...category,
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
        this.taskCategories[indexToIncrement].count++;
      }
    });
  }
}
