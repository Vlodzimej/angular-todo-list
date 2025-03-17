import { TaskStatus } from '@enums';
import { ITaskItem } from '../task-item';

export interface ITaskSection {
  title: string;
  type: TaskStatus;
  tasks: ITaskItem[];
}
