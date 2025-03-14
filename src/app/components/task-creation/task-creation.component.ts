import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss'],
  imports: [ReactiveFormsModule],
})
export class TaskCreationComponent implements OnInit {
  task = new FormControl('');

  constructor() {}

  ngOnInit() {}

  handleAddButtonClick() {
    console.log(this.task.value);
  }
}
