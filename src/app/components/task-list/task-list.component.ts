import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITaskItem, ITaskCategory } from '@models';
import { TaskStatus } from '@enums';
import { TaskCategories } from '@data';
import { CommonModule } from '@angular/common';
import { TaskCategoryComponent } from "../../shared/components/task-category/task-category.component";

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [CommonModule, TaskCategoryComponent]
})
export class TaskListComponent implements OnInit {

  taskList: ITaskItem[] = []
  taskCategories: ITaskCategory[] = []

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.fetchTasks().subscribe(data => {
      this.taskList = data
    })

    this.taskCategories = this.taskService.getTaskCategories()
  }
}
