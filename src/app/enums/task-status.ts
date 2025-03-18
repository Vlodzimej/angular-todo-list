/**
 * Статусы задач
 */
export enum TaskStatus {
  OPENED = 'OPENED',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
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
