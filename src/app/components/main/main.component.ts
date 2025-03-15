import { Component, OnInit } from '@angular/core';
import { TaskCategoriesInfoComponent, TaskCreationComponent, TaskListComponent } from '@components';
import { ITaskCategory, ITaskItem } from '@models';
import { TaskService } from '@services';

@Component({
  selector: 'todo-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [TaskCategoriesInfoComponent, TaskCreationComponent, TaskListComponent]
})
export class MainComponent implements OnInit {
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
