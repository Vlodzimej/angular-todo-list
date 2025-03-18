import { TaskStatus } from '@enums';

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
