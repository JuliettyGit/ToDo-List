import { ITaskItem } from "./ITaskItem";

export interface ITaskListState
{
  tasksToDo:  Array<ITaskItem>,
  tasksInProgress: Array<ITaskItem>,
  finishedTasks:  Array<ITaskItem>,
}
