import { TaskStatus } from '@enums';

/**
 * Задача
 */
export interface ITaskItem {
  id: number;
  value: string;
  status: TaskStatus;
}
