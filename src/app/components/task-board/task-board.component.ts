import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TaskStatus } from '@enums';
import { ITaskItem, ITaskSection } from '@models';
import {
  CdkDragDrop,
  DragDropModule,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
  imports: [CommonModule, DragDropModule],
})
export class TaskBoardComponent implements OnChanges {
  @Input() taskList: ITaskItem[] = [];
  @Output() changeTaskStatus = new EventEmitter<ITaskItem>();

  sections: ITaskSection[] = [
    {
      title: 'Открыто',
      type: TaskStatus.OPENED,
      tasks: [],
    },
    {
      title: 'В работе',
      type: TaskStatus.IN_PROGRESS,
      tasks: [],
    },
    {
      title: 'Закрыто',
      type: TaskStatus.CLOSED,
      tasks: [],
    },
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('taskList')) {
      const taskList = changes['taskList'].currentValue;
      this.fillTaskSections(taskList);
    }
  }

  private fillTaskSections(taskList: ITaskItem[]) {
    this.sections = this.sections.map((section) => ({ ...section, tasks: [] }));

    const openedTaskSectionIndex = this.sections.findIndex(
      (section) => section.type == TaskStatus.OPENED
    );
    const inProgressTaskSectionIndex = this.sections.findIndex(
      (section) => section.type == TaskStatus.IN_PROGRESS
    );
    const closedTaskSectionIndex = this.sections.findIndex(
      (section) => section.type == TaskStatus.CLOSED
    );

    taskList.forEach((taskItem) => {
      switch (taskItem.status) {
        case TaskStatus.OPENED:
          this.sections[openedTaskSectionIndex].tasks.push(taskItem);
          break;
        case TaskStatus.IN_PROGRESS:
          this.sections[inProgressTaskSectionIndex].tasks.push(taskItem);
          break;
        case TaskStatus.CLOSED:
          this.sections[closedTaskSectionIndex].tasks.push(taskItem);
          break;
        default:
          break;
      }
    });
  }

  drop(event: CdkDragDrop<ITaskItem[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const task = event.container.data[event.currentIndex];
      const newStatus = this.sections.find(
        (section) => section.tasks === event.container.data
      )?.type;

      if (newStatus) {
        task.status = newStatus;
        this.changeTaskStatus.emit(task);
      }
    }
  }

  getOtherSectionsData(indexToExclude: number): string[] {
    return this.sections
      .filter((_, index) => index !== indexToExclude)
      .map((section) => section.type);
  }
}
