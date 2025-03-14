import { TaskStatus } from '@enums';
import { ITaskCategory } from '@models';

export const TaskCategories: ITaskCategory[] = [
  {
    type: TaskStatus.CLOSED,
    count: 2,
    icon: "task_status_closed",
  },
  {
    type: TaskStatus.IN_PROGRESS,
    count: 2,
    icon: "task_status_in_progress",
  },
  {
    type: TaskStatus.OPENED,
    count: 1,
    icon: "task_status_opened",
  },
];
