import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'task-category',
  templateUrl: './task-category.component.html',
  styleUrls: ['./task-category.component.scss'],
  imports: []
})
export class TaskCategoryComponent implements OnInit {

  @Input() name: string = "";
  @Input() count: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
