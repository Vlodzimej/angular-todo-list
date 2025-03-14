import { TaskStatus } from '@enums';
import { ITaskCategory } from '@models';

export const TaskCategories: ITaskCategory[] = [
  {
    type: TaskStatus.CLOSED,
    count: 0,
  },
  {
    type: TaskStatus.IN_PROGRESS,
    count: 0,
  },
  {
    type: TaskStatus.OPENED,
    count: 0,
  },
];
