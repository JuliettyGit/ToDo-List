import { Task } from "./task";

export interface TaskListState
{
  tasksToDo:  Array<Task>,
  tasksInProgress: Array<Task>,
  finishedTasks:  Array<Task>,
}
