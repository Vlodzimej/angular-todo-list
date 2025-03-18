import { TaskStatus } from '@enums';

/** Получение названия статуса задачи для отображения в таблице */
export const GetStatusTitleForTask = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.OPENED:
      return 'Открыт';
    case TaskStatus.IN_PROGRESS:
      return 'В работе';
    case TaskStatus.CLOSED:
      return 'Закрыт';
    default:
      return '';
  }
};

/** Получение приоритета статусов для сортировки задач */
export const GetStatusPriority = (status: TaskStatus): number => {
  switch (status) {
    case TaskStatus.OPENED:
      return 1;
    case TaskStatus.IN_PROGRESS:
      return 2;
    case TaskStatus.CLOSED:
      return 3;
    default:
      return 0;
  }
};
