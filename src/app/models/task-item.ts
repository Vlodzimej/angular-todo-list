import { TaskStatus } from "@enums"

/**
 * Задача
 */
export interface ITaskItem {
    /** Название */
    value: string
    /** Статус */
    status: TaskStatus
}