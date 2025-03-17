import { TaskStatus } from '@enums';
import { ITaskStatusItem } from '@models';

export const TaskStatuses: ITaskStatusItem[] = [
  {
    type: TaskStatus.CLOSED,
    count: 0,
    icon: "task_status_closed",
  },
  {
    type: TaskStatus.IN_PROGRESS,
    count: 0,
    icon: "task_status_in_progress",
  },
  {
    type: TaskStatus.OPENED,
    count: 0,
    icon: "task_status_opened",
  },
];
