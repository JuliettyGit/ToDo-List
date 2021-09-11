export interface ITaskItem {
  taskText: string;
  taskStatus: string;
  taskId?: number;
  taskDetails?: string;
  deadline?: Date | undefined;
}
