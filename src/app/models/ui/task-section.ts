import { TaskStatus } from '@enums';
import { ITaskItem } from '../task-item';

/**
 * Модель секции задач для отображения в tasks-board
 */
export interface ITaskSection {
  type: TaskStatus;
  tasks: ITaskItem[];
}
