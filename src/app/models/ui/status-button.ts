export interface TStatusButton {
  title: string;
  action: Action;
}

export type Action = () => void;
