import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITaskItem, ITaskCategory } from '@models';
import { CommonModule } from '@angular/common';
import { TaskCategoryComponent } from '@shared';

@Component({
  selector: 'task-categories-info',
  templateUrl: './task-categories-info.component.html',
  styleUrls: ['./task-categories-info.component.scss'],
  imports: [CommonModule, TaskCategoryComponent]
})
export class TaskCategoriesInfoComponent implements OnInit {

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
