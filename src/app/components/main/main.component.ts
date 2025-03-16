import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import {
  TaskCategoriesInfoComponent,
  TaskCreationComponent,
  TaskListComponent,
} from '@components';
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
export class MainComponent implements OnInit, DoCheck {
  taskList: ITaskItem[] = [];
  taskCategories: ITaskCategory[] = [];

  isMoreButtonVisible: boolean = false;
  minItemsNumberToShow = 5;
  currentItemsNumberToShow = 5;

  constructor(private taskService: TaskService) {}

  ngDoCheck(): void {
    console.log(this.taskList);
  }

  ngOnInit() {
    this.taskService.fetchTasks().subscribe((data) => {
      this.taskList = data;
    });

    this.taskCategories = this.taskService.getTaskCategories();
  }

  handleAddTaskEvent(newTaskItem: ITaskItem) {
    this.taskList = [newTaskItem, ...this.taskList];
  }

  moreButtonClick() {
    this.currentItemsNumberToShow =
      this.currentItemsNumberToShow == this.minItemsNumberToShow
        ? this.taskList.length
        : this.minItemsNumberToShow;
        console.log("moreButtonClick", this.currentItemsNumberToShow)
  }
}
