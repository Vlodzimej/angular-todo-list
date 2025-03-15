import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskCreationComponent, TaskCategoriesInfoComponent } from '@components';
import { TaskCategoryComponent } from "./shared/components/task-category/task-category.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskCategoriesInfoComponent, TaskCreationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-todo-list';
}
