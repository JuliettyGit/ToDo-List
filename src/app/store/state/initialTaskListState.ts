import { ITaskListState } from "../../shared/interfaces/ITaskListState";

export const initialTaskListState: ITaskListState =
  {
  tasksToDo: [],
  tasksInProgress: [],
  finishedTasks: [],
  }

export function getInitialState(): ITaskListState
{
  return initialTaskListState;
}
