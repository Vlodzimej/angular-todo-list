import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ITaskItem } from '@models';
import { TaskService } from '@services';

@Component({
  selector: 'task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss'],
  imports: [ReactiveFormsModule],
})
export class TaskCreationComponent implements OnInit {
  @Output() addTaskEvent = new EventEmitter<ITaskItem>();

  task = new FormControl('');

  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  handleAddButtonClick() {
    const text = (this.task.value ?? '').trim();
    if (text.length == 0) {
      return;
    }
    this.taskService.addTask(text).subscribe(result => {
      if (result != null) {
        this.addTaskEvent.emit(result);
      }
    });
  }
}

