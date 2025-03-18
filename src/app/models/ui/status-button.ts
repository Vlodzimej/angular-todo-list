/**
 * Модель для кнопки статуса задачи в таблице
 */
export interface TStatusButton {
  title: string;
  action: Action;
}

export type Action = () => void;
