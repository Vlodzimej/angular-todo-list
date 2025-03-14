import { TaskStatus } from "@enums"

/**
 * Задача
 */
export interface ITaskItem {
    /** Название */
    name: string
    /** Статус */
    status: TaskStatus
}