/**
 * Статусы задач
 */
export enum TaskStatus {
  OPENED = 'Открыто',
  IN_PROGRESS = 'В работе',
  CLOSED = 'Закрыто',
}

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
