import { TaskStatus } from '@enums';
import { ITaskSection } from '@models';

/** Шаблон данных секций с задачами для отображения в task-board */
export const TaskSectionsBlank: ITaskSection[] = [
  {
    type: TaskStatus.OPENED,
    tasks: [],
  },
  {
    type: TaskStatus.IN_PROGRESS,
    tasks: [],
  },
  {
    type: TaskStatus.CLOSED,
    tasks: [],
  },
];
