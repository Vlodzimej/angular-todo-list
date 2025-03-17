import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITaskItem } from '@models';

@Component({
  selector: 'task-small-list',
  templateUrl: './task-small-list.component.html',
  styleUrls: ['./task-small-list.component.scss'],
})
export class TaskSmallListComponent {
  @Input() taskList: ITaskItem[] = [];
  @Output() showTaskDetails = new EventEmitter<number>();

  handleClickStatusbutton(index: number) {
    this.showTaskDetails.emit(index);
  }
}
