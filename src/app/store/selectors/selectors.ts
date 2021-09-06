import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TODO_REDUCER_NODE } from "../reducers/app.reducers";
import { IAppState } from "../../shared/interfaces/IAppState";
import { ITaskItem } from "../../shared/interfaces/ITaskItem";
import { taskStatuses } from "../../shared/constants/taskStatuses";


export const taskListFutureSelector = createFeatureSelector<IAppState>(TODO_REDUCER_NODE);

export const taskListSelector = createSelector(
  taskListFutureSelector,
  (state: IAppState) =>
  {
    return state.taskList
  }
);

export const tasksToDoSelector = createSelector(
  taskListFutureSelector,
  (state: IAppState) =>
  {
    const data: ITaskItem[] = Object.values(state.taskList);
    return data.filter((taskItem: ITaskItem) => taskItem.taskStatus == taskStatuses[0].status);
  }
);

export const tasksInProgress = createSelector(
  taskListFutureSelector,
  (state) =>
  {
    const data: ITaskItem[] = Object.values(state.taskList);
    return data.filter((taskItem: ITaskItem) => taskItem.taskStatus == taskStatuses[1].status);
  }
);
export const finishedTasks = createSelector(
  taskListFutureSelector,
  (state) =>
  {
    const data: ITaskItem[] = Object.values(state.taskList);
    return data.filter((taskItem: ITaskItem) => taskItem.taskStatus == taskStatuses[2].status);
  }
);
