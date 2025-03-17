import { TaskStatus } from "@enums";

export interface ITaskStatusItem {
    type: TaskStatus;
    count: number;
    icon: string;
}