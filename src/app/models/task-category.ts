import { TaskStatus } from "@enums";

export interface ITaskCategory {
    type: TaskStatus;
    count: number;
}