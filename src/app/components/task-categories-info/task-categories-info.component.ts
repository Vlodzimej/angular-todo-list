import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCategoryComponent } from '@shared';
import { ITaskCategory } from '@models';

@Component({
  selector: 'task-categories-info',
  templateUrl: './task-categories-info.component.html',
  styleUrls: ['./task-categories-info.component.scss'],
  imports: [CommonModule, TaskCategoryComponent]
})
export class TaskCategoriesInfoComponent implements OnInit {

  @Input({required: true}) taskCategories!: ITaskCategory[] 

  constructor() { }

  ngOnInit() {

  }
}
