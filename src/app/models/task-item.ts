import { TaskStatus } from "@enums"

/**
 * Задача
 */
export interface ITaskItem {
    /** Идентификатор задачи */
    id: number
    /** Название */
    value: string
    /** Статус */
    status: TaskStatus
}