import { TaskStatus } from '@enums';

/**
 * Модель для отображения статусов и счетчиков задач
 */
export interface ITaskStatusItem {
  type: TaskStatus;
  count: number;
  icon: string;
}
